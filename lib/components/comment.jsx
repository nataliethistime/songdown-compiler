'use strict';

var React = require('react');
var markdown = require('markdown').markdown;

var Comment = React.createClass({
  propTypres: {
    line: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      line: ''
    };
  },

  render: function() {

    var thisIsDangerous = {
      __html: markdown.toHTML(this.props.line)
    };

    return (
      <div className="markdown" dangerouslySetInnerHTML={thisIsDangerous}></div>
    );
  }
});

module.exports = Comment;
