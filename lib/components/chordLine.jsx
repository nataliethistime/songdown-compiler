'use strict';

var React = require('react');

var transpose = require('songdown-transpose');

var styles = require('../styles');

var ChordLine = React.createClass({
  propTypes: {
    source: React.PropTypes.string.isRequired,
    theme: React.PropTypes.string.isRequired,
    transpose: React.PropTypes.number.isRequired,
    showChords: React.PropTypes.bool.isRequired
  },

  getDefaultProps: function() {
    return {
      source: '',
      theme: 'default',
      transpose: 0,
      showChords: true
    };
  },

  fixAccidentals: function(line) {
    return line
      // http://www.fileformat.info/info/unicode/char/266f/index.htm
      .replace(/#/g, '&#9839;')
      // http://www.fileformat.info/info/unicode/char/266d/index.htm
      .replace(/(\S)b/g, '$1' + '&#9837;');
  },

  render: function() {
    var line = transpose.transposeLine(this.props.source, this.props.transpose);

    if (this.props.showChords) {
      return (
        <div style={styles[this.props.theme].chordLine}>
          <div
            dangerouslySetInnerHTML={{__html: this.fixAccidentals(line)}}
            style={styles[this.props.theme].line}
          ></div>
        </div>
      );
    } else {
      return <span></span>;
    }
  }
});

module.exports = ChordLine;
