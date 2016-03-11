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
    return library.required(value) && pattern.test(value.trim());
  },
  required: function(value) {
    return typeof(value) === 'string' && value.trim() !== '';
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

export class FormStateAdaptor {

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


export let adaptor = new FormStateAdaptor(library, content, aliases);
