'use strict';

var React = require('react');

var tokens = require('../tokens');
var styles = require('../styles');

var Header = React.createClass({

  propTypes: {
    line: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired,
    chords: React.PropTypes.bool.isRequired,
    lyrics: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      line: '',
      theme: 'default',
      chords: true,
      lyrics: true
    };
  },

  shouldShow: function() {
    // Don't show the header when we've got nothing in the verse block to show!
    if (!this.props.chords && !this.props.lyrics) {
      return false;
    } else {
      return true;
    }
  },

  render: function() {
    // Normalize the symbol at the end of the header.
    var header = this.props.line.replace(tokens.ANY_VERSE_HEADER, '') + ':';

    return (
      <div style={styles[this.props.theme].header}>
        {this.shouldShow() ? header : ''}
      </div>
    );
  }
});

module.exports = Header;
