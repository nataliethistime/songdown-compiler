'use strict';

var React = require('react');
var _ = require('lodash');

var styles = require('../styles');

var ChordLine = require('./chordLine.jsx');
var LyricLine = require('./lyricLine.jsx');
var TabLine = require('./tabLine.jsx');

var Verse = React.createClass({
  propTypes: {
    chords: React.PropTypes.bool.isRequired,
    lyrics: React.PropTypes.bool.isRequired,
    lines: React.PropTypes.array.isRequired,
    transpose: React.PropTypes.number.isRequired,
    showChords: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      chords: true,
      lyrics: true,
      lines: '',
      transpose: 0,
      showChords: true
    };
  },

  parseStandardBlock: function(lines) {
    return _.map(lines, function(line, i) {
      if (i % 2 === 0) {
        return (
          <ChordLine
            line={line}
            theme={this.props.theme}
            transpose={this.props.transpose}
            showChords={this.props.showChords}
          />
        );
      } else {
        return (
          <LyricLine line={line} theme={this.props.theme} />
        );
      }
    }, this);
  },

  parseChordBlock: function(lines) {
    return _.map(lines, function(line) {
      return (
        <ChordLine
          line={line}
          theme={this.props.theme}
          transpose={this.props.transpose}
          showChords={this.props.showChords}
        />
      );
    }, this);
  },

  parseLyricBlock: function(lines) {
    return _.map(lines, function(line) {
      return (
        <LyricLine line={line} theme={this.props.theme} />
      );
    }, this);
  },

  parseTabBlock: function(lines) {
    return _.map(lines, function(line) {
      return (
        <TabLine line={line} theme={this.props.theme} />
      );
    }, this);
  },

  parse: function(lines) {
    if (this.props.chords && this.props.lyrics) {
      return this.parseStandardBlock(lines);
    } else if (this.props.chords && !this.props.lyrics) {
      return this.parseChordBlock(lines);
    } else if (!this.props.chords && this.props.lyrics) {
      return this.parseLyricBlock(lines);
    } else {
      return this.parseTabBlock(lines);
    }
  },

  render: function() {
    var nodes = this.parse(this.props.lines);

    return (
      <div style={styles[this.props.theme].verse}>
        {nodes}
      </div>
    );
  }
});

module.exports = Verse;
