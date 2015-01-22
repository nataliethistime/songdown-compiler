'use strict';
var Song, expect;

expect = require('chai').expect;

Song = require('../lib');

describe('Song', function() {
  it('should be a function', function() {
    expect(Song).to.be.a('function');
  });
  describe('#toHtml', function() {
    var song;
    song = new Song('Hello, World!');
    expect(song.toHtml).to.be.a('function');
    expect(song.toHtml()).to.equal('<p>Hello, World!</p>\n');
  });
});
