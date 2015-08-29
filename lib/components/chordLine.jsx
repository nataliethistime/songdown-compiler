'use strict';

var React = require('react');

var transpose = require('songdown-transpose');

var styles = require('../styles');

var ChordLine = React.createClass({
  propTypes: {
    line: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired,
    transpose: React.PropTypes.number.isRequired,
    showChords: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      line: '',
      theme: 'default',
      transpose: 0,
      showChords: true
    };
  },

  render: function() {
    var line = transpose.transposeLine(this.props.line, this.props.transpose);

    if (this.props.showChords) {
      return (
        <div style={styles[this.props.theme].chordLine}>
          <span style={styles[this.props.theme].line}>{line}</span>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
});

module.exports = ChordLine;
