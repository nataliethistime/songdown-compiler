'use strict';

var expect = require('chai').expect;

var fs = require('fs');

var Song = require('../lib');
var syntaxTest = fs.readFileSync(__dirname + '/test.songdown').toString();
var song = new Song(syntaxTest);


describe('Song', function() {
  it('should be a function', function() {
    expect(Song).to.be.a('function');
  });

  describe('#toHtml', function() {
    it('should be a function', function() {
      expect(song.toHtml).to.be.a('function');
    });

    it('should output a string', function() {
      var html = song.toHtml();
      expect(html).to.be.a('string');
    });
  });

  describe('#parse', function() {
    var parsed = new Song(syntaxTest).parse();

    it('should produce an array of nodes', function() {
      expect(parsed).to.be.a('array');
    });
  });
});
