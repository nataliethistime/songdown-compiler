'use strict';

var React = require('react');
var prettyPrint = require('html').prettyPrint;

var fs = require('fs');

var Compiler = require('../lib/components/compiler');

var syntaxTest = fs.readFileSync(__dirname + '/test.songdown').toString();

var arr = [];

arr.push(React.renderToStaticMarkup(
  <Compiler
    source={syntaxTest}
    theme="default"
  />
));

arr.push(React.renderToStaticMarkup(
  <Compiler
    source={syntaxTest}
    theme="default"
    transpose={2}
  />
));

arr.push(React.renderToStaticMarkup(
  <Compiler
    source={syntaxTest}
    theme="default"
    transpose={-2}
  />
));

var html = arr.join('<br /><br /><hr /><br /><br />');

fs.writeFileSync(__dirname + '/test.html', prettyPrint(html));
