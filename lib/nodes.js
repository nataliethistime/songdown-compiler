'use strict';

var marked = require('marked');
var _ = require('lodash');
var Tokens = require('./tokens');

function chordsLine(line) {
  return '<div class="verse-chords">' + line + '</div>';
};

function lyricsLine(line) {
  return '<div class="verse-lyrics">' + line + '</div>';
};

function verseBlock(lines) {
  return lines.join("\n") + '</div>\n\n';
};

function VerseHeader(section) {
  this.section = section;
  this.toHtml = function() {
    this.section = this.section.replace(Tokens.VERSE_CHORDS_HEADER, Tokens.VERSE_START);
    this.section = this.section.replace(Tokens.VERSE_LYRICS_HEADER, Tokens.VERSE_START);
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
    var dynamics, dynamicsMatch, html, line, repeat, repeatMatch, title, titleStr;
    line = this.section.replace(Tokens.GOTO, '');
    dynamicsMatch = _.first(/\(.+\)/i.exec(line)) || null;
    repeatMatch = _.first(/x\s?\d+/i.exec(line)) || null;
    titleStr = line.replace(dynamicsMatch || '', '').replace(repeatMatch || '', '').trim();
    title = '<span class="goto-title">' + titleStr + '</span>';
    dynamics = dynamicsMatch != null ? '<span class="goto-dynamics">' + dynamicsMatch + '</span>' : '';
    repeat = repeatMatch != null ? '<span class="goto-repeat">' + repeatMatch + '</span>' : '';
    html = [title, dynamics, repeat].join(' ');
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
