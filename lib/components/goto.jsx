'use strict';

var React = require('react');

var tokens = require('../tokens');
var styles = require('../styles');

var Goto = React.createClass({

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
    var goto = this.props.line.replace(tokens.GOTO, '');

    return (
      <p>
        Play <span style={styles[this.props.theme].goto}>{goto}</span>
      </p>
    );
  }
});

module.exports = Goto;
