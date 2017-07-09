# react-formstate-validation

[![Coverage Status](https://coveralls.io/repos/github/dtrelogan/react-formstate-validation/badge.svg?branch=master)](https://coveralls.io/github/dtrelogan/react-formstate-validation?branch=master)
[![Build Status](https://travis-ci.org/dtrelogan/react-formstate-validation.svg?branch=master)](https://travis-ci.org/dtrelogan/react-formstate-validation)

A validation library for [react-formstate](https://www.npmjs.com/package/react-formstate)

    $ npm install react-formstate --save
    $ npm install react-formstate-validation --save

## Basic setup

```es6
import { FormState } from 'react-formstate';
import { validationAdapter } from 'react-formstate-validation';
validationAdapter.plugInto(FormState);
```

## Usage

Inputs in these examples are designed to work with [react-formstate](https://www.npmjs.com/package/react-formstate). react-formstate-validation provides common validation functions that can be supplied to [react-formstate's](https://www.npmjs.com/package/react-formstate) fluent validation API.

```jsx
<Input
  formField='amount'
  label='Amount'
  required
  fsValidate={v => v.min(25).max(1000)}
  />
```

To tailor a message:

```jsx
<Input
  required='Please provide an amount'
  fsv={v => v.min(25)
    .message('Amount must be at least $25')
    .max(1000)
    .msg('Amount cannot be more than $1000')}
  />
```

## Validations

Except where starred, functions only accept string values, anything else will fail validation.

For details, see the [code](/index.es6), it's very clear.

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

## Aliases

```es6
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

## Configurable message content

Default content from [/content/en-us/default.js](/content/en-us/default.js):

```es6
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
  required: '%1 is required',
  startsWith: '%1 must start with %2',
  url: '%1 must be a url'
};
```

To provide your own:

```es6
import { FormState } from 'react-formstate';
import * as rfsv from 'react-formstate-validation';
let validationAdapter = new rfsv.FormStateAdapter(
  rfsv.library,
  yourContent,
  rfsv.aliases
  );
validationAdapter.plugInto(FormState);
```

Note you can provide your own library and aliases. You can plug in [validator](https://www.npmjs.com/package/validator) if you want.

## Expansion

[react-formstate](https://www.npmjs.com/package/react-formstate) provides a variety of ways to express [validation logic](https://github.com/dtrelogan/react-formstate/blob/master/docs/validationWiring.md), including [registering](https://github.com/dtrelogan/react-formstate/blob/master/docs/validationWiring.md#registering-validation-functions) your own validation functions.

For minor additions and modifications it's easiest to start there.

(That being said, contributions to this library are welcome!)

### Contributions

If you recognize the value of [react-formstate](https://www.npmjs.com/package/react-formstate) and [react-formstate-validation](https://www.npmjs.com/package/react-formstate-validation) please star the NPM packages and the GitHub repositories.

Also, you can help others find the packages by recommending them and linking to them. Thanks!
