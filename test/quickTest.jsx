'use strict';

var React = require('react');
var prettyPrint = require('html').prettyPrint;

var fs = require('fs');

var Song = require('../lib');

var syntaxTest = fs.readFileSync(__dirname + '/test.songdown').toString();
var html = React.renderToStaticMarkup(<Song source={syntaxTest} theme="default" />);

fs.writeFileSync(__dirname + '/test.html', prettyPrint(html));
