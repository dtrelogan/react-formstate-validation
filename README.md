# react-formstate-validation

a validation library for [react-formstate](https://www.npmjs.com/package/react-formstate)

    $ npm install react-formstate --save
    $ npm install react-formstate-validation --save

## setup

```jsx
import { FormState } from 'react-formstate';
import { adaptor as validationAdaptor } from 'react-formstate-validation';
validationAdaptor.plugInto(FormState);
```

### sample usage

```jsx
<Input
  formField='amount'
  label='Amount'
  required='Please provide an amount'
  fsValidate={v =>
    v.min(25)
    .message('$25 minimum')
    .max(1000)
    .message('$1000 maximum')
  }
  />
```

## validation library

see the [code](/index.es6). it's not scary i promise.

## why?

most validation libraries have swiss army knife functions that take a variety of options and make it difficult to produce default message content.

this library has simple, single-purpose validation functions that make it easy to provide default message content in whatever language you choose.

it is not intended to be a robust validation library that handles every possible use case. those already exist.

it *is* intended to elegantly express the most *common* use cases and save you effort where it makes the most sense.

note that [react-formstate](https://www.npmjs.com/package/react-formstate) gives you a number of different ways to express [validation logic](https://github.com/dtrelogan/react-formstate/blob/master/docs/validationWiring.md) so when it doesn't fit in the box there is no need to force the issue - even using this library is optional.

### string values

the library is optimized for html-like forms that work with string values.

the only functions that work with non-string values are:
- equals
  - a wrapper on javascript's === operator
  - use it to determine if a checkbox is set to true for example
- length, maxLength, minLength
  - these work on anything with a length property
  - use it for a select-multiple input for example
- exists
  - intended for internal use since react [controlled components](https://facebook.github.io/react/docs/forms.html#controlled-components) do not provide null or undefined values

all other functions will fail noisily if you use them with non-string values.

basically a non-string value will always cause validation to fail.

### optionally terse

in the interest of saving you time and reducing your jsx footprint:

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
```jsx
<Input
  formField='amount'
  label='Amount'
  required='Please provide an amount'
  fsv={v => v.min(25).msg('$25 minimum').max(1000).msg('$1000 maximum')}
  />
```

## configuration

### message content

```jsx
import { FormState } from 'react-formstate';
import * as rfsv from 'react-formstate-validation';
var validationAdaptor = new rfsv.FormStateAdaptor(
  rfsv.library,
  yourContentHere,
  rfsv.aliases
  );
validationAdaptor.plugInto(FormState);
```

see default content [here](/content/en-us/default.js)

### validations and aliases

if you have a javascript object containing validation functions that return something truthy, you can plug it in.

you can plug in [validator](https://www.npmjs.com/package/validator) if you want:

```jsx
import { FormState } from 'react-formstate';
import validator from 'validator';
import * as rfsv from 'react-formstate-validation';
var validationAdaptor = new rfsv.FormStateAdaptor(
  validator,
  optionallyProvideMessageContentHere,
  optionallyAliasValidationFunctionNames
  );
validationAdaptor.plugInto(FormState);
```
