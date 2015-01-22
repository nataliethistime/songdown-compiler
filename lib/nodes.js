'use strict';
var Comments, GotoVerse, Node, Tokens, VerseChords, VerseCommon, VerseHeader, VerseLyrics, chordsLine, lyricsLine, marked, verseBlock, _,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

marked = require('marked');

_ = require('lodash');

Tokens = require('./tokens');

Node = (function() {
  function Node(section) {
    this.section = section != null ? section : 'ERROR!!!';
  }

  Node.prototype.toHtml = function() {
    throw new Error('override me please!!!');
  };

  return Node;

})();

chordsLine = function(line) {
  return '<div class="verse-chords">' + line + '</div>';
};

lyricsLine = function(line) {
  return '<div class="verse-lyrics">' + line + '</div>';
};

verseBlock = function(lines) {
  return lines.join("\n") + '</div>\n\n';
};

VerseHeader = (function(_super) {
  __extends(VerseHeader, _super);

  function VerseHeader() {
    return VerseHeader.__super__.constructor.apply(this, arguments);
  }

  VerseHeader.prototype.toHtml = function() {
    this.section = this.section.replace(Tokens.VERSE_CHORDS_HEADER, Tokens.VERSE_START);
    this.section = this.section.replace(Tokens.VERSE_LYRICS_HEADER, Tokens.VERSE_START);
    return '<div class="verse-wrap"><div class="verse-title">' + this.section + '</div>';
  };

  return VerseHeader;

})(Node);

VerseCommon = (function(_super) {
  __extends(VerseCommon, _super);

  function VerseCommon() {
    return VerseCommon.__super__.constructor.apply(this, arguments);
  }

  VerseCommon.prototype.toHtml = function() {
    var lines;
    lines = _.map(this.section, function(line, i) {
      if (i % 2 === 0) {
        return chordsLine(line);
      } else {
        return lyricsLine(line);
      }
    });
    return verseBlock(lines);
  };

  return VerseCommon;

})(Node);

VerseChords = (function(_super) {
  __extends(VerseChords, _super);

  function VerseChords() {
    return VerseChords.__super__.constructor.apply(this, arguments);
  }

  VerseChords.prototype.toHtml = function() {
    var lines;
    lines = _.map(this.section, chordsLine);
    return verseBlock(lines);
  };

  return VerseChords;

})(Node);

VerseLyrics = (function(_super) {
  __extends(VerseLyrics, _super);

  function VerseLyrics() {
    return VerseLyrics.__super__.constructor.apply(this, arguments);
  }

  VerseLyrics.prototype.toHtml = function() {
    var lines;
    lines = _.map(this.section, lyricsLine);
    return verseBlock(lines);
  };

  return VerseLyrics;

})(Node);

Comments = (function(_super) {
  __extends(Comments, _super);

  function Comments() {
    return Comments.__super__.constructor.apply(this, arguments);
  }

  Comments.prototype.toHtml = function() {
    this.section = this.section.join('<br />');
    return marked(this.section);
  };

  return Comments;

})(Node);

GotoVerse = (function(_super) {
  __extends(GotoVerse, _super);

  function GotoVerse() {
    return GotoVerse.__super__.constructor.apply(this, arguments);
  }

  GotoVerse.prototype.toHtml = function() {
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

  return GotoVerse;

})(Node);

module.exports = {
  VerseHeader: VerseHeader,
  VerseCommon: VerseCommon,
  VerseChords: VerseChords,
  VerseLyrics: VerseLyrics,
  Comments: Comments,
  GotoVerse: GotoVerse
};
