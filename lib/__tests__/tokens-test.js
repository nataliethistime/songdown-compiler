'use strict';

jest.dontMock('../tokens');

var matches = function(str, regex) {
  var foo = str.match(regex);

  if (foo === null) {
    return false;
  } else {
    return true;
  }
};

describe('tokens', function() {

  describe('VERSE_END', function() {
    it('should be correct, lol', function() {
      // I'm not entirely sure what to test here. :P
      var tokens = require('../tokens');
      expect(tokens.VERSE_END).toBe('---');
    });
  });

  describe('VERSE_COMMON_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(matches('Header:', tokens.VERSE_COMMON_HEADER)).toBe(true);
      expect(matches('Header: ', tokens.VERSE_COMMON_HEADER)).toBe(true);
    });
  });

  describe('VERSE_CHORDS_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(matches('Header+', tokens.VERSE_CHORDS_HEADER)).toBe(true);
      expect(matches('Header+ ', tokens.VERSE_CHORDS_HEADER)).toBe(true);
    });
  });

  describe('VERSE_LYRICS_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(matches('Header-', tokens.VERSE_LYRICS_HEADER)).toBe(true);
      expect(matches('Header- ', tokens.VERSE_LYRICS_HEADER)).toBe(true);
    });
  });

  describe('ANY_VERSE_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(matches('Header:', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(matches('Header+', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(matches('Header-', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(matches('Header: ', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(matches('Header+ ', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(matches('Header- ', tokens.ANY_VERSE_HEADER)).toBe(true);
    });
  });

  describe('GOTO', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(matches('-> Something', tokens.GOTO)).toBe(true);
      expect(matches(' -> Something', tokens.GOTO)).toBe(false);
    });
  });
});
