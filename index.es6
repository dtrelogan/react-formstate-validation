export let library = {
  email: function(value) {
    return library.regex(value, /^\S+@\S+\.\S+$/);
  },
  equals: function(value, baseline) {
    return value === baseline;
  },
  exists: function(value) {
    return value !== undefined && value !== null;
  },
  greaterThan: function(value, baseline) {
    return library.required(value) && Number(value) > baseline;
  },
  integer: function(value) {
    return library.regex(value, /^-?[0-9]+$/);
  },
  length: function(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length === len;
  },
  lessThan: function(value, baseline) {
    return library.required(value) && Number(value) < baseline;
  },
  max: function(value, baseline) {
    return library.required(value) && Number(value) <= baseline;
  },
  maxLength: function(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length <= len;
  },
  min: function(value, baseline) {
    return library.required(value) && Number(value) >= baseline;
  },
  minLength: function(value, len) {
    return library.exists(value) && library.exists(value.length) && value.length >= len;
  },
  number: function(value) {
    return library.required(value) && !Number.isNaN(Number(value));
  },
  numeric: function(value) {
    return library.regex(value, /^[0-9]+$/);
  },
  regex: function(value, pattern) {
    return library.required(value) && pattern.test(value);
  },
  required: function(value) {
    return typeof(value) === 'string' && value.trim() !== '';
  },
  startsWith: function(value, searchString) {
    return library.required(value) && library.exists(searchString) && value.substr(0, searchString.length) === searchString;
  },
  url: function(value) {
    // matches blank strings so you have a choice of pairing it with required
    if (value === null || (typeof(value) === 'string' && value.trim() === '')) {
      return true;
    }
    //
    // https://gist.github.com/dperini/729294
    //
    let re_weburl = new RegExp(
      "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
          // IP address exclusion
          // private & local networks
          "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
          "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
          "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
          // IP address dotted notation octets
          // excludes loopback network 0.0.0.0
          // excludes reserved space >= 224.0.0.0
          // excludes network & broacast addresses
          // (first & last IP address of each class)
          "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
          "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
          "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
          // host name
          "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
          // domain name
          "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
          // TLD identifier
          "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
          // TLD may end with dot
          "\\.?" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
      "$", "i"
    );
    return library.regex(value, re_weburl);
  }
};

import content from './content/en-us/default.js';
export { content };

export let aliases = [
  { name: 'equals', alias: 'eq' },
  { name: 'greaterThan', alias: 'gt' },
  { name: 'integer', alias: 'int' },
  { name: 'length', alias: 'len' },
  { name: 'lessThan', alias: 'lt' },
  { name: 'max', alias: 'lte' },
  { name: 'maxLength', alias: 'maxlen' },
  { name: 'maxLength', alias: 'xlen' },
  { name: 'min', alias: 'gte' },
  { name: 'minLength', alias: 'minlen' },
  { name: 'minLength', alias: 'nlen' }
];

export class FormStateAdapter {

  //
  // public
  //

  constructor(validationLibrary, messageContent, aliases) {
    this.validationLibrary = validationLibrary;
    this.messageContent = messageContent;
    this.aliases = aliases;
  }

  plugInto(FormState) {
    if (this.validationLibrary.required) {
      FormState.setRequired(this.createFormStateValidationFunction('required'));
    }

    let names = Object.keys(this.validationLibrary);
    for(let i = 0, len = names.length; i < len; i++) {
      let name = names[i];
      FormState.registerValidation(
        name,
        this.createFormStateValidationFunction(name)
      );
    }

    if (this.aliases && this.aliases.length) {
      for(let i = 0, len = this.aliases.length; i < len; i++) {
        let alias = aliases[i];
        FormState.registerValidation(
          alias.alias,
          this.createFormStateValidationFunction(alias.name)
        );
      }
    }
  }

  //
  // "private"
  //

  createFormStateValidationFunction(name) {
    return function() { // value, label, additionalArgs
      let args = [].slice.call(arguments);
      let validate = this.validationLibrary[name];
      if (!validate(args[0], ...args.slice(2))) {
        return this.interpolateMessage(name, args.slice(1));
      }
    }.bind(this);
  }

  interpolateMessage(name, args) {
    let message = this.messageContent && this.messageContent[name];
    if (!message) { return `${args[0]} is invalid`; }
    for(let i = 0, len = args.length; i < len; i++) {
      message = message.split(`%${i+1}`).join(`${args[i]}`);
    }
    return message;
  }
}


export let validationAdapter = new FormStateAdapter(library, content, aliases);
