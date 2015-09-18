'use strict';

jest.dontMock('../compiler.jsx');

describe('compiler', function() {
  it('should work', function() {
    var compiler = require('../compiler.jsx');
    console.log(compiler.compile('Hello, World!'));
  });
});
