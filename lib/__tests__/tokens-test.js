'use strict';

jest.dontMock('../tokens');
jest.dontMock('../util');

var util = require('../util');

describe('tokens', function() {

  describe('VERSE_END', function() {
    it('should be correct', function() {
      var tokens = require('../tokens');
      expect(tokens.VERSE_END).toBe('>>>');
    });
  });

  describe('VERSE_COMMON_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(util.regexMatches('Header:', tokens.VERSE_COMMON_HEADER)).toBe(true);
      expect(util.regexMatches('Header: ', tokens.VERSE_COMMON_HEADER)).toBe(true);
    });
  });

  describe('VERSE_CHORDS_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(util.regexMatches('Header+', tokens.VERSE_CHORDS_HEADER)).toBe(true);
      expect(util.regexMatches('Header+ ', tokens.VERSE_CHORDS_HEADER)).toBe(true);
    });
  });

  describe('VERSE_LYRICS_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(util.regexMatches('Header-', tokens.VERSE_LYRICS_HEADER)).toBe(true);
      expect(util.regexMatches('Header- ', tokens.VERSE_LYRICS_HEADER)).toBe(true);
    });
  });

  describe('VERSE_TAB_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(util.regexMatches('Header*', tokens.VERSE_TAB_HEADER)).toBe(true);
      expect(util.regexMatches('Header* ', tokens.VERSE_TAB_HEADER)).toBe(true);
    });
  });

  describe('ANY_VERSE_HEADER', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(util.regexMatches('Header:', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header+', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header-', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header*', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header: ', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header+ ', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header- ', tokens.ANY_VERSE_HEADER)).toBe(true);
      expect(util.regexMatches('Header* ', tokens.ANY_VERSE_HEADER)).toBe(true);
    });
  });

  describe('GOTO', function() {
    it('should match correctly', function() {
      var tokens = require('../tokens');
      expect(util.regexMatches('-> Something', tokens.GOTO)).toBe(true);
      expect(util.regexMatches(' -> Something', tokens.GOTO)).toBe(false);
    });
  });
});
