# react-formstate-validation

[![Coverage Status](https://coveralls.io/repos/github/dtrelogan/react-formstate-validation/badge.svg?branch=master)](https://coveralls.io/github/dtrelogan/react-formstate-validation?branch=master)
[![Build Status](https://travis-ci.org/dtrelogan/react-formstate-validation.svg?branch=master)](https://travis-ci.org/dtrelogan/react-formstate-validation)

a validation library for [react-formstate](https://github.com/dtrelogan/react-formstate)

    $ npm install react-formstate --save
    $ npm install react-formstate-validation --save

## basic setup

```jsx
import { FormState } from 'react-formstate';
import { validationAdapter } from 'react-formstate-validation';
validationAdapter.plugInto(FormState);
```

## usage

```jsx
<Input
  formField='amount'
  label='Amount'
  required
  fsValidate={v => v.min(25).max(1000)}
  />
```

to tailor a message:

```jsx
<Input
  required='Please provide an amount'
  fsv={v => v.min(25)
    .message('Amount must be at least $25')
    .max(1000)
    .msg('Amount cannot be more than $1000')}
  />
```

## validations

except where starred, functions only accept string values, anything else will fail validation.

for details, see the [code](/index.es6). it's very clear i promise.

- email
- equals*
- greaterThan
- integer
- length*
- lessThan
- max
- maxLength*
- min
- minLength*
- number
- numeric
- regex
- required
- startsWith
- url

## aliases

```jsx
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
```

## configurable message content

default content from [/content/en-us/default.js](/content/en-us/default.js):

```jsx
module.exports = {
  email: '%1 must be an email address',
  equals: '%1 must equal %2',
  greaterThan: '%1 must be greater than %2',
  integer: '%1 must be an integer',
  length: '%1 must have length equal to %2',
  lessThan: '%1 must be less than %2',
  max: '%1 must be at most %2',
  maxLength: '%1 must have a maximum length of %2',
  min: '%1 must be at least %2',
  minLength: '%1 must have a minimum length of %2',
  number: '%1 must be a number',
  numeric: '%1 must only contain numbers',
  required: '%1 is required'
};
```

to provide your own:

```jsx
import { FormState } from 'react-formstate';
import * as rfsv from 'react-formstate-validation';
let validationAdapter = new rfsv.FormStateAdapter(
  rfsv.library,
  yourContent,
  rfsv.aliases
  );
validationAdapter.plugInto(FormState);
```

note you can provide your own library and aliases. you can plug in [validator](https://www.npmjs.com/package/validator) if you want.

## expansion

[react-formstate](https://github.com/dtrelogan/react-formstate) provides a variety of ways to express [validation logic](https://github.com/dtrelogan/react-formstate/blob/master/docs/validationWiring.md), including [registering](https://github.com/dtrelogan/react-formstate/blob/master/docs/validationWiring.md#registering-validation-functions) your own validation functions.

for minor additions and modifications it's easiest to start there.

(that being said, contributions to this library are welcome!)
