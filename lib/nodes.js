'use strict';

var marked = require('marked');
var _ = require('lodash');
var tokens = require('./tokens');

function chordsLine(line) {
  return '<div class="verse-chords">' + line + '</div>';
}

function lyricsLine(line) {
  return '<div class="verse-lyrics">' + line + '</div>';
}

function verseBlock(lines) {
  return lines.join("\n") + '</div>\n\n';
}

function VerseHeader(section) {
  this.section = section;
  this.toHtml = function() {
    this.section = this.section.replace(tokens.VERSE_CHORDS_HEADER, tokens.VERSE_START);
    this.section = this.section.replace(tokens.VERSE_LYRICS_HEADER, tokens.VERSE_START);
    return '<div class="verse-wrap"><div class="verse-title">' + this.section + '</div>';
  };
}

function VerseCommon(section) {
  this.section = section;
  this.toHtml = function() {
    var lines = _.map(this.section, function(line, i) {
      if (i % 2 === 0) {
        return chordsLine(line);
      } else {
        return lyricsLine(line);
      }
    });
    return verseBlock(lines);
  };
}

function VerseChords(section) {
  this.section = section;
  this.toHtml = function() {
    var lines = _.map(this.section, chordsLine);
    return verseBlock(lines);
  };
}

function VerseLyrics(section) {
  this.section = section;
  this.toHtml = function() {
    var lines = _.map(this.section, lyricsLine);
    return verseBlock(lines);
  };
}

function Comments(section) {
  this.section = section;
  this.toHtml = function() {
    return marked(this.section.join('<br />'));
  };
}

function GotoVerse(section) {
  this.section = section;
  this.toHtml = function() {
    var line = this.section.replace(tokens.GOTO, '');
    var dynamicsMatch = _.first(/\(.+\)/i.exec(line)) || null;
    var repeatMatch = _.first(/x\s?\d+/i.exec(line)) || null;

    var titleStr = line.replace(dynamicsMatch || '', '').replace(repeatMatch || '', '').trim();
    var title = '<span class="goto-title">' + titleStr + '</span>';

    var dynamics;
    if (dynamicsMatch !== null) {
      dynamics = '<span class="goto-dynamics">' + dynamicsMatch + '</span>';
    } else {
      dynamics = '';
    }

    var repeat;
    if (repeatMatch !== null) {
      repeat = '<span class="goto-repeat">' + repeatMatch + '</span>';
    } else {
      repeat = '';
    }

    var html = [title, dynamics, repeat].join(' ');
    return "<p>Play " + html + "</p>";
  };
}

module.exports = {
  VerseHeader: VerseHeader,
  VerseCommon: VerseCommon,
  VerseChords: VerseChords,
  VerseLyrics: VerseLyrics,
  Comments: Comments,
  GotoVerse: GotoVerse
};
