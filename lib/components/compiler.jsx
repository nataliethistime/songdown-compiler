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

var util = require('../util');

var Compiler = React.createClass({

  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string,
    transpose: React.PropTypes.number,
    fontSize: React.PropTypes.number,
    showChords: React.PropTypes.bool,
    showGOTOs: React.PropTypes.bool,
    showComments: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default',
      transpose: 0,
      fontSize: 16,
      showChords: true,
      showGOTOs: true,
      showComments: true
    }
  },

  isHeader: function(line) {
    return util.regexMatches(line, tokens.ANY_VERSE_HEADER);
  },

  parseVerse: function(lines) {
    var nodes = [];

    // These indicate whether the verse block contains chords, lyrics, both, or none.
    var chords = true;
    var lyrics = true;

    var header = lines.shift();

    if (header.match(tokens.VERSE_CHORDS_HEADER)) {
      chords = true;
      lyrics = false;
    } else if (header.match(tokens.VERSE_LYRICS_HEADER)) {
      chords = false;
      lyrics = true;
    } else if (header.match(tokens.VERSE_TAB_HEADER)) {
      chords = false;
      lyrics = false;
    }

    nodes.push(
      <div style={styles[this.props.theme].verseWrapper}>
        <Header
          line={header}
          theme={this.props.theme}
          chords={this.props.showChords}
          lyrics={lyrics}
        />

        <Verse
          lines={lines}
          theme={this.props.theme}
          transpose={this.props.transpose}
          showChords={this.props.showChords}
          chords={chords}
          lyrics={lyrics}
        />
      </div>
    );

    return nodes;
  },

  parseSection: function(lines) {
    var nodes = [];

    while (!this.isHeader(lines[0])) {
      var line = lines.shift();

      if (!line) {
        // We've run out of lines.
        return nodes;
      }

      if (line.match(tokens.GOTO)) {
        if (this.props.showGOTOs) {
          nodes.push(
            <Goto line={line} theme={this.props.theme} />
          );
        }
      } else {
        if (this.props.showComments) {
          nodes.push(
            <Comment line={line} />
          );
        }
      }
    }

    return util.joinToArray(nodes, this.parseVerse(lines));
  },

  // Split by newline and remove all empty lines.
  splitSection: function(section) {
    return _.filter(section.split('\n'), function(line) {
      return line !== '';
    });
  },

  parse: function(source) {
    var nodes = [];
    source = normalizeNewline(source);

    _.each(source.split(tokens.VERSE_END), function(section) {
      var parsedSection = this.parseSection(this.splitSection(section));
      nodes = util.joinToArray(nodes, parsedSection);
    }, this);

    return nodes;
  },

  render: function() {
    var nodes = this.parse(this.props.source);
    var style = _.merge({}, styles[this.props.theme].song, {fontSize: this.props.fontSize});

    return (
      <div style={style}>
        {nodes}
      </div>
    );
  }
});

module.exports = Compiler;
