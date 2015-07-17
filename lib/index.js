'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var normalizeNewline = require('normalize-newline');
var tokens = require('./tokens');
var Nodes = require('./nodes');


function OldSong(text) {
  this.text = text;
  this.nodes = [];

  this.parseSection = function(section) {

    var lines = _.filter(section.split(tokens.NEWLINE), function(line) {
      return line !== '\n' && line !== '';
    });

    if (_.size(lines) < 0) return;

    var verseClass = null;
    var verseStartIndex = -1;

    _.each(lines, function(line, i) {
      if (line.match(tokens.VERSE_COMMON_HEADER)) {
        verseClass = Nodes.VerseCommon;
      } else if (line.match(tokens.VERSE_CHORDS_HEADER)) {
        verseClass = Nodes.VerseChords;
      } else if (line.match(tokens.VERSE_LYRICS_HEADER)) {
        verseClass = Nodes.VerseLyrics;
      }

      if (verseClass !== null) {
        verseStartIndex = i;
        return false;
      }
    });

    var header = lines[verseStartIndex];
    var verse = lines.slice(verseStartIndex + 1, lines.length);

    var comments = verseStartIndex === -1 ? _.clone(lines) : lines.slice(0, verseStartIndex);
    this.parseComments(comments);

    if (verseClass === null) {
      return;
    }

    this.nodes.push(new Nodes.VerseHeader(header));
    this.nodes.push(new verseClass(verse));
  };

  this.parseComments = function(lines) {
    if (_.size(lines) < 0) return;

    var storage = [];
    _.each(lines, function(line) {
      if (line.match(tokens.GOTO)) {
        this.nodes.push(new Nodes.Comments(storage));
        storage = [];
        this.nodes.push(new Nodes.GotoVerse(line));
      } else {
        storage.push(line);
      }
    }, this);

    if (_.size(lines) > 0) {
      this.nodes.push(new Nodes.Comments(storage));
    }
  };

  this.parse = function() {
    _.each(this.text.split(tokens.VERSE_END), this.parseSection, this);
    return this.nodes;
  };

  this.toHtml = function() {
    if (this.nodes.length <= 0) {
      this.parse();
    }

    return _.map(this.nodes, function(node) {
      return node.toHtml();
    }).join("\n");
  };
}

require('node-jsx').install({extension: '.jsx'});
module.exports = require('./components/song');
