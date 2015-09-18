'use strict';

var _ = require('lodash');

var regexMatches = function(str, regex) {
  if (!str || !regex) {
    return false;
  }

  var match = str.match(regex);

  if (match === null) {
    return false;
  } else {
    return true;
  }
};

module.exports.regexMatches = regexMatches;
