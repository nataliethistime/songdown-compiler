'use strict';

var _ = require('lodash');

// This method takes an array and a value (whatever it may be) and joins it into the array.
var joinToArray = function(array, value) {

  if (!value) {
    return array;
  }

  if (!_.isArray(value)) {
    value = [value];
  }

  return array.concat(value);
};

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

module.exports.joinToArray = joinToArray;
module.exports.regexMatches = regexMatches;
