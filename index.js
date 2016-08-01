'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validationAdapter = exports.FormStateAdapter = exports.aliases = exports.content = exports.library = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _default = require('./content/en-us/default.js');

var _default2 = _interopRequireDefault(_default);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var library = exports.library = {
  email: function email(value) {
    return library.regex(value, /^\S+@\S+\.\S+$/);
  },
  equals: function equals(value, baseline) {
    return value === baseline;
  },
  exists: function exists(value) {
    return value !== undefined && value !== null;
  },
  greaterThan: function greaterThan(value, baseline) {
    return library.required(value) && Number(value) > baseline;
  },
  integer: function integer(value) {
    return library.regex(value, /^-?[0-9]+$/);
  },
  length: function length(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length === len;
  },
  lessThan: function lessThan(value, baseline) {
    return library.required(value) && Number(value) < baseline;
  },
  max: function max(value, baseline) {
    return library.required(value) && Number(value) <= baseline;
  },
  maxLength: function maxLength(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length <= len;
  },
  min: function min(value, baseline) {
    return library.required(value) && Number(value) >= baseline;
  },
  minLength: function minLength(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length >= len;
  },
  number: function number(value) {
    return library.required(value) && !Number.isNaN(Number(value));
  },
  numeric: function numeric(value) {
    return library.regex(value, /^[0-9]+$/);
  },
  regex: function regex(value, pattern) {
    return library.required(value) && pattern.test(value.trim());
  },
  required: function required(value) {
    return typeof value === 'string' && value.trim() !== '';
  },
  startsWith: function startsWith(value, searchString) {
    return library.required(value) && library.exists(searchString) && value.trim().substr(0, searchString.length) === searchString;
  },
  url: function url(value) {
    // matches blank strings so you have a choice of pairing it with required
    if (value === null || typeof value === 'string' && value.trim() === '') {
      return true;
    }
    //
    // https://gist.github.com/dperini/729294
    //
    var re_weburl = new RegExp("^" +
    // protocol identifier
    "(?:(?:https?|ftp)://)" +
    // user:pass authentication
    "(?:\\S+(?::\\S*)?@)?" + "(?:" +
    // IP address exclusion
    // private & local networks
    "(?!(?:10|127)(?:\\.\\d{1,3}){3})" + "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" + "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
    // IP address dotted notation octets
    // excludes loopback network 0.0.0.0
    // excludes reserved space >= 224.0.0.0
    // excludes network & broacast addresses
    // (first & last IP address of each class)
    "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" + "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" + "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" + "|" +
    // host name
    '(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)' +
    // domain name
    '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*' +
    // TLD identifier
    '(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))' +
    // TLD may end with dot
    "\\.?" + ")" +
    // port number
    "(?::\\d{2,5})?" +
    // resource path
    "(?:[/?#]\\S*)?" + "$", "i");
    return library.regex(value, re_weburl);
  }
};

exports.content = _default2.default;
var aliases = exports.aliases = [{ name: 'equals', alias: 'eq' }, { name: 'greaterThan', alias: 'gt' }, { name: 'integer', alias: 'int' }, { name: 'length', alias: 'len' }, { name: 'lessThan', alias: 'lt' }, { name: 'max', alias: 'lte' }, { name: 'maxLength', alias: 'maxlen' }, { name: 'maxLength', alias: 'xlen' }, { name: 'min', alias: 'gte' }, { name: 'minLength', alias: 'minlen' }, { name: 'minLength', alias: 'nlen' }];

var FormStateAdapter = exports.FormStateAdapter = function () {

  //
  // public
  //

  function FormStateAdapter(validationLibrary, messageContent, aliases) {
    _classCallCheck(this, FormStateAdapter);

    this.validationLibrary = validationLibrary;
    this.messageContent = messageContent;
    this.aliases = aliases;
  }

  _createClass(FormStateAdapter, [{
    key: 'plugInto',
    value: function plugInto(FormState) {
      if (this.validationLibrary.required) {
        FormState.setRequired(this.createFormStateValidationFunction('required'));
      }

      var names = Object.keys(this.validationLibrary);
      for (var i = 0, len = names.length; i < len; i++) {
        var name = names[i];
        FormState.registerValidation(name, this.createFormStateValidationFunction(name));
      }

      if (this.aliases && this.aliases.length) {
        for (var _i = 0, _len = this.aliases.length; _i < _len; _i++) {
          var alias = aliases[_i];
          FormState.registerValidation(alias.alias, this.createFormStateValidationFunction(alias.name));
        }
      }
    }

    //
    // "private"
    //

  }, {
    key: 'createFormStateValidationFunction',
    value: function createFormStateValidationFunction(name) {
      return function () {
        // value, label, additionalArgs
        var args = [].slice.call(arguments);
        var validate = this.validationLibrary[name];
        if (!validate.apply(undefined, [args[0]].concat(_toConsumableArray(args.slice(2))))) {
          return this.interpolateMessage(name, args.slice(1));
        }
      }.bind(this);
    }
  }, {
    key: 'interpolateMessage',
    value: function interpolateMessage(name, args) {
      var message = this.messageContent && this.messageContent[name];
      if (!message) {
        return args[0] + ' is invalid';
      }
      for (var i = 0, len = args.length; i < len; i++) {
        message = message.split('%' + (i + 1)).join('' + args[i]);
      }
      return message;
    }
  }]);

  return FormStateAdapter;
}();

var validationAdapter = exports.validationAdapter = new FormStateAdapter(library, _default2.default, aliases);
