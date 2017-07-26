'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fixObject = exports.fixValue = exports.defaultFixers = exports.fixBool = exports.fixRecursive = exports.fixDate = undefined;

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// date reviving copied from https://github.com/expressjs/body-parser/issues/17
var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
var regexDXgridDate = /^\d{4}\/\d{2}\/\d{2}( \d{2}:\d{2}:\d{2})?/;

function fixDate(value) {
  var fixers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFixers;

  var match = void 0;
  if (typeof value === 'string' && (match = value.match(regexIso8601) || value.match(regexDXgridDate))) {
    var ms = Date.parse(match[0]);
    if (!isNaN(ms)) {
      return new Date(ms);
    }
  } else return value;
}

var regexBool = /(true|false)/i;

function fixBool(value) {
  var fixers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFixers;

  var match = void 0;
  if (typeof value === 'string' && (match = value.match(regexBool))) return {
    true: true,
    false: false
  }[match[0].toLowerCase()];else return value;
}

function fixRecursive(value) {
  var fixers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFixers;

  if (value != null && (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)) === 'object') {
    return fixObject(value, fixers);
  }
  return value;
}

var defaultFixers = [fixDate, fixRecursive];

function fixValue(value) {
  var fixers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFixers;

  return fixers.reduce(function (r, v) {
    return v(r, fixers);
  }, value);
}

function fixObject(o) {
  var fixers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultFixers;

  for (var f in o) {
    o[f] = fixValue(o[f], fixers);
  }
  return o;
}

exports.fixDate = fixDate;
exports.fixRecursive = fixRecursive;
exports.fixBool = fixBool;
exports.defaultFixers = defaultFixers;
exports.fixValue = fixValue;
exports.fixObject = fixObject;