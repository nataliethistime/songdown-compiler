'use strict';

var path = require('path');

module.exports = {
  entry: './lib/components/compiler.jsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  externals: {
    'react': 'React',
    'lodash': '_'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'jsx'
      }
    ]
  },
  target: 'node'
};
