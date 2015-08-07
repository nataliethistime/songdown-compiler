'use strict';

var React = require('react');
var _ = require('lodash');
var normalizeNewline = require('normalize-newline');

var styles = require('../styles');
var tokens = require('../tokens');

var Comment = require('./comment');
var Goto = require('./goto');
var Header = require('./header');
var Verse = require('./verse');

var Compiler = React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string,
    transpose: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default',
      transpose: 0
    }
  },

  isHeader: function(line) {
    if (!line) {
      return false;
    }

    var match = line.match(tokens.ANY_VERSE_HEADER);

    if (_.isArray(match)) {
      return true;
    } else {
      return false;
    }
  },

  parseSection: function(section) {
    var nodes = [];

    var lines = _.filter(section.split('\n'), function(line) {
      return line !== '';
    });

    while (!this.isHeader(_.first(lines))) {
      var line = lines.shift();

      if (!line) {
        return nodes;
      }

      if (line.match(tokens.GOTO)) {
        nodes.push(
          <Goto line={line} theme={this.props.theme} />
        );
      } else {
        nodes.push(
          <Comment line={line} />
        );
      }
    }


    // These indicate whether the verse block contains chords, lyrics, or both.
    var chords = true;
    var lyrics = true;

    var header = lines.shift();
    if (header.match(tokens.VERSE_CHORDS_HEADER)) {
      chords = true;
      lyrics = false;
    } else if (header.match(tokens.VERSE_LYRICS_HEADER)) {
      chords = false;
      lyrics = true;
    }

    nodes.push(<Header line={header} theme={this.props.theme} />);
    nodes.push(
      <Verse
        lines={lines}
        theme={this.props.theme}
        transpose={this.props.transpose}
        chords={chords}
        lyrics={lyrics}
      />
    );

    return nodes;
  },

  parse: function(source) {
    var nodes = [];

    _.each(source.split(tokens.VERSE_END), function(section) {
      var rv = this.parseSection(section);

      if (!_.isArray(rv)) {
        rv = [rv];
      }

      nodes = nodes.concat(rv);
    }, this);

    return nodes;
  },

  render: function() {
    var nodes = this.parse(normalizeNewline(this.props.source));

    return (
      <div style={styles[this.props.theme].song}>
        {nodes}
      </div>
    );
  }
});

module.exports = Compiler;
