'use strict';

var React = require('react');
var marked = require('marked');

var Comment = React.createClass({
  propTypres: {
    source: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      source: ''
    };
  },

  render: function() {

    var thisIsDangerous = {
      __html: marked(this.props.source)
    };

    return (
      <div dangerouslySetInnerHTML={thisIsDangerous}></div>
    );
  }
});

module.exports = Comment;
