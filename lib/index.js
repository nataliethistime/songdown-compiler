'use strict';
var Nodes, Song, Tokens, fs, normalizeNewline, path, _,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

path = require('path');

fs = require('fs');

_ = require('lodash');

normalizeNewline = require('normalize-newline');

Tokens = require('./tokens');

Nodes = require('./nodes');

module.exports = Song = (function() {
  function Song(text) {
    this.text = text;
    this.parseSection = __bind(this.parseSection, this);
    this.nodes = [];
  }

  Song.prototype.parseSection = function(section) {
    var comments, header, lines, verse, verseClass, verseStartIndex;
    lines = _.filter(section.split(Tokens.NEWLINE), function(line) {
      return line !== '\n' && line !== '';
    });
    if (!(_.size(lines) > 0)) {
      return;
    }
    verseClass = null;
    verseStartIndex = -1;
    _.each(lines, function(line, i) {
      if (line.match(Tokens.VERSE_COMMON_HEADER)) {
        verseClass = Nodes.VerseCommon;
      } else if (line.match(Tokens.VERSE_CHORDS_HEADER)) {
        verseClass = Nodes.VerseChords;
      } else if (line.match(Tokens.VERSE_LYRICS_HEADER)) {
        verseClass = Nodes.VerseLyrics;
      }
      if (verseClass != null) {
        verseStartIndex = i;
        return false;
      }
    });
    header = lines[verseStartIndex];
    verse = lines.slice(verseStartIndex + 1, lines.length);
    comments = verseStartIndex === -1 ? _.clone(lines) : lines.slice(0, verseStartIndex);
    this.parseComments(comments);
    if (verseClass == null) {
      return;
    }
    this.nodes.push(new Nodes.VerseHeader(header));
    return this.nodes.push(new verseClass(verse));
  };

  Song.prototype.parseComments = function(lines) {
    var storage;
    if (!(_.size(lines) > 0)) {
      return;
    }
    storage = [];
    _.each(lines, (function(_this) {
      return function(line) {
        if (line.match(Tokens.GOTO)) {
          _this.nodes.push(new Nodes.Comments(storage));
          storage = [];
          return _this.nodes.push(new Nodes.GotoVerse(line));
        } else {
          return storage.push(line);
        }
      };
    })(this));
    if (_.size(lines) > 0) {
      console.log(Nodes);
      return this.nodes.push(new Nodes.Comments(storage));
    }
  };

  Song.prototype.parse = function() {
    return _.each(this.text.split(Tokens.VERSE_END), this.parseSection);
  };

  Song.prototype.toHtml = function() {
    if (!this.text) {
      this.load();
    }
    if (this.nodes.length <= 0) {
      this.parse();
    }
    return _.map(this.nodes, function(node) {
      return node.toHtml();
    }).join("\n");
  };

  return Song;

})();
