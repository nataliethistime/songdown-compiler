'use strict';

var React = require('react');
var _ = require('lodash');

var styles = require('../styles');


var ChordLine = React.createClass({
  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default'
    };
  },

  render: function() {
    return (
      <div style={styles[this.props.theme].chordLine}>
        {this.props.source}
      </div>
    );
  }
});

var LyricsLine = React.createClass({
  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default'
    };
  },

  render: function() {
    return (
      <div style={styles[this.props.theme].lyricsLine}>
        {this.props.source}
      </div>
    );
  }
});

var Verse = React.createClass({
  propTypes: {
    chords: React.PropTypes.bool.isRequired,
    lyrics: React.PropTypes.bool.isRequired,
    lines: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      chords: true,
      lyrics: true,
      lines: ''
    };
  },

  parseStandardBlock: function(lines) {
    return lines;
  },

  parseChordBlock: function(lines) {
    return _.map(lines, function(line) {
      return (
        <ChordLine source={line} theme={this.props.theme} />
      );
    }, this);
  },

  parseLyricsBlock: function(lines) {
    return _.map(lines, function(line) {
      return (
        <LyricsLine source={line} theme={this.props.theme} />
      );
    }, this);
  },

  parse: function(lines) {
    if (this.props.chords && this.props.lyrics) {
      return this.parseStandardBlock(lines);
    } else if (this.props.chords && !this.props.lyrics) {
      return this.parseChordBlock(lines);
    } else {
      return this.parseLyricsBlock(lines);
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
