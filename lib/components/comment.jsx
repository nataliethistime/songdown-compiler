'use strict';

var React = require('react');
var marked = require('marked');

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
      __html: marked(this.props.line)
    };

    return (
      <div className="markdown" dangerouslySetInnerHTML={thisIsDangerous}></div>
    );
  }
});

module.exports = Comment;
