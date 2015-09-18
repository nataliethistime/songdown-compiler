'use strict';

var React = require('react');
var _ = require('lodash');
var normalizeNewline = require('normalize-newline');

var styles = require('../styles');
var tokens = require('../tokens');

var Comment = require('./comment.jsx');
var Goto = require('./goto.jsx');
var Header = require('./header.jsx');
var Verse = require('./verse.jsx');

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

  statics: {
    compile: function(options) {

      if (typeof options === 'string') {
        options = {
          source: options
        };
      }

      return React.renderToStaticMarkup(React.createElement(Compiler, options));
    }
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

    if (util.regexMatches(header, tokens.VERSE_CHORDS_HEADER)) {
      chords = true;
      lyrics = false;
    } else if (util.regexMatches(header, tokens.VERSE_LYRICS_HEADER)) {
      chords = false;
      lyrics = true;
    } else if (util.regexMatches(header, tokens.VERSE_TAB_HEADER)) {
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

    while (lines[0] && !this.isHeader(lines[0])) {
      var line = lines.shift();

      if (util.regexMatches(line, tokens.GOTO)) {
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

    if (lines.length > 0) {
      return nodes.concat(this.parseVerse(lines));
    } else {
      return nodes;
    }
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
      nodes = nodes.concat(this.parseSection(this.splitSection(section)));
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
