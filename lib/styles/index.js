'use strict';

var _ = require('lodash');

var baseTheme = require('./themes/base');
var defaultTheme = require('./themes/default');

module.exports = {
  'default': _.merge({}, baseTheme, defaultTheme)
};
