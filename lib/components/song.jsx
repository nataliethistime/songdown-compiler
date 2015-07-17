'use strict';

var React = require('react');
var _ = require('lodash');

var tokens = require('../tokens');
var styles = require('../styles');

var Comment = require('./comment');
var Header = require('./header');
var Verse = require('./verse');

var Song = React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default'
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

      nodes.push(
        <Comment source={line} />
      );
    }

    var header = lines.shift();

    // These indicate whether the verse block contains chords, lyrics, or both.
    var chords = true;
    var lyrics = true;

    if (header.match(tokens.VERSE_CHORDS_HEADER)) {
      chords = true;
      lyrics = false;
    } else if (header.match(tokens.VERSE_LYRICS_HEADER)) {
      chords = false;
      lyrics = true;
    }

    nodes.push(<Header source={header} theme={this.props.theme} />);
    nodes.push(
      <Verse lines={lines} theme={this.props.theme} chords={chords} lyrics={lyrics} />
    );

    return nodes;
  },

  parse: function(source) {
    var nodes = [];

    _.each(this.props.source.split(tokens.VERSE_END), function(section) {
      var rv = this.parseSection(section);

      if (!_.isArray(rv)) {
        rv = [rv];
      }

      nodes = nodes.concat(rv);
    }, this);

    return nodes;
  },

  render: function() {
    var nodes = this.parse(this.props.source);

    return (
      <div style={styles[this.props.theme].song}>
        {nodes}
      </div>
    );
  }
});

module.exports = Song;
