'use strict';

var React = require('react');

var styles = require('../styles');

var TabLine = React.createClass({
  propTypes: {
    line: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      line: '',
      theme: 'default'
    };
  },

  render: function() {
    return (
      <div style={styles[this.props.theme].tabLine}>
        <span style={styles[this.props.theme].line}>{this.props.line}</span>
      </div>
    );
  }
});

module.exports = TabLine;
