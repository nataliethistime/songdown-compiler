'use strict';

var React = require('react');
var _ = require('lodash');

var transpose = require('songdown-transpose');

var styles = require('../styles');


var ChordLine = React.createClass({
  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired,
    transpose: React.PropTypes.number.isRequired,
    showChords: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default',
      transpose: 0,
      showChords: true
    };
  },

  render: function() {
    var line = transpose.transposeLine(this.props.source, this.props.transpose);

    if (this.props.showChords) {
      return (
        <div style={styles[this.props.theme].chordLine}>
          <span style={styles[this.props.theme].line}>{line}</span>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
});

var LyricsLine = React.createClass({
  propTypes: {
    line: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      line: '',
      theme: 'default'
    };
  },

  render: function() {
    return (
      <div style={styles[this.props.theme].lyricsLine}>
        <span style={styles[this.props.theme].line}>{this.props.line}</span>
      </div>
    );
  }
});

var TabLine = React.createClass({
  propTypes: {
    line: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      line: '',
      theme: 'default'
    };
  },

  render: function() {
    return (
      <div style={styles[this.props.theme].tabLine}>
        <span style={styles[this.props.theme].line}>{this.props.line}</span>
      </div>
    );
  }
});

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
            source={line}
            theme={this.props.theme}
            transpose={this.props.transpose}
            showChords={this.props.showChords}
          />
        );
      } else {
        return (
          <LyricsLine source={line} theme={this.props.theme} />
        );
      }
    }, this);
  },

  parseChordBlock: function(lines) {
    return _.map(lines, function(line) {
      return (
        <ChordLine
          source={line}
          theme={this.props.theme}
          transpose={this.props.transpose}
          showChords={this.props.showChords}
        />
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
      return this.parseLyricsBlock(lines);
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
