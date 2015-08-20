'use strict';

var React = require('react');
var prettyPrint = require('html').prettyPrint;

var fs = require('fs');

var Compiler = require('../lib/components/compiler');

var syntaxTest = fs.readFileSync(__dirname + '/test.songdown').toString();

var Separator = React.createClass({
  render: function() {
    return (
      <span>
        <br /><br /><hr /><br /><br />
      </span>
    );
  }
});

var Test = React.createClass({
  render: function() {
    return (
      <div>
        <Compiler
          source={syntaxTest}
          theme="default"
        />

        <Separator />

        <Compiler
          source={syntaxTest}
          theme="default"
          transpose={2}
        />

        <Separator />

        <Compiler
          source={syntaxTest}
          theme="default"
          transpose={-2}
        />

        <Separator />

        <Compiler
          source={syntaxTest}
          theme="default"
          fontSize={20}
        />

        <Separator />

        <Compiler
          source={syntaxTest}
          theme="default"
          showChords={false}
        />

        <Separator />

        <Compiler
          source={syntaxTest}
          theme="default"
          showGOTOs={false}
        />

        <Separator />

        <Compiler
          source={syntaxTest}
          theme="default"
          showComments={false}
        />
      </div>
    );
  }
});

var html = React.renderToStaticMarkup(<Test />);
fs.writeFileSync(__dirname + '/test.html', prettyPrint(html));
