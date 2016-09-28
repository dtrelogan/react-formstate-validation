'use strict';

var assert = require('assert');

var rfsv = require('../index.js');

var lib = rfsv.library;

describe('validation library', function() {
  describe('email', function() {
    it('normal case', function() { assert.equal(true, lib.email('a@b.c')); });
    it('requires @', function() { assert.equal(false, lib.email('ab.c')); });
    it('requires .', function() { assert.equal(false, lib.email('a@bc')); });
    it('does not trim', function() { assert.equal(false, lib.email('  a@b.c   ')); });
    it('spaces', function() { assert.equal(false, lib.email('a @b.c')); });
    it('multiple dots', function() { assert.equal(true, lib.email('a@b..c')); });
    it('multiple @s', function() { assert.equal(true, lib.email('a@b@c.d')); });
    it('numbers', function() { assert.equal(true, lib.email('1@2.3')); });
    it('null', function() { assert.equal(false, lib.email(null)); });
  });
  describe('equals', function() {
    it('value', function() { assert.equal(true, lib.equals('3', '3')); });
    it('and type', function() { assert.equal(false, lib.equals('3', 3)); });
    it('boolean', function() { assert.equal(true, lib.equals(true, true)); });
    it('boolean2', function() { assert.equal(false, lib.equals('true', true)); });
    it('array', function() { assert.equal(false, lib.equals([], [])); });
  });
  describe('exists', function() {
    it('undefined', function() { assert.equal(false, lib.exists(undefined)); });
    it('null', function() { assert.equal(false, lib.exists(null)); });
    it('other', function() { assert.equal(true, lib.exists('')); });
  });
  describe('greaterThan', function() {
    it('lt', function() { assert.equal(false, lib.greaterThan('5', 6)); });
    it('eq', function() { assert.equal(false, lib.greaterThan('5', 5)); });
    it('gt', function() { assert.equal(true, lib.greaterThan('5', 4)); });
    it('floats', function() { assert.equal(true, lib.greaterThan('3.14', 3.13)); });
    it('negative numbers', function() { assert.equal(true, lib.greaterThan('-1', -2)); })
    it('null > -1', function() { assert.equal(false, lib.greaterThan(null, -1)); });
    it('3 > 2', function() { assert.equal(false, lib.greaterThan(3, 2)); });
    it('b > a', function() { assert.equal(false, lib.greaterThan('b', 'a')); });
    it('true > -1', function() { assert.equal(false, lib.greaterThan(true, -1)); });
  });
  describe('integer', function() {
    it('01234567899876543210', function() {
      assert.equal(true, lib.integer('01234567899876543210'));
    });
    it('-4', function() { assert.equal(true, lib.integer('-4')); });
    it('+4', function() { assert.equal(false, lib.integer('+4')); });
    it('--4', function() { assert.equal(false, lib.integer('--4')); });
    it('1.3', function() { assert.equal(false, lib.integer('1.3')); });
    it(' 4 ', function() { assert.equal(false, lib.integer(' 4 ')); });
    it(' 4 6 ', function() { assert.equal(false, lib.integer(' 4 6 ')); });
    it('null', function() { assert.equal(false, lib.integer(null)); });
    it('boolean', function() { assert.equal(false, lib.integer(true)); });
    it('a', function() { assert.equal(false, lib.integer('a')); });
    it('number', function() { assert.equal(false, lib.integer(3)); });
  });
  describe('length', function() {
    it('lt', function() { assert.equal(false, lib.length('hello', 6)); });
    it('eq', function() { assert.equal(true, lib.length('hello', 5)); });
    it('gt', function() { assert.equal(false, lib.length('hello', 4)); });
    it('null', function() { assert.equal(false, lib.length(null, 100)); });
    it('no length', function() { assert.equal(false, lib.length({}, 100)); });
    it('arraylt', function() { assert.equal(false, lib.length([1,2], 3)); });
    it('arrayeq', function() { assert.equal(true, lib.length([1,2], 2)); });
    it('arraygt', function() { assert.equal(false, lib.length([1,2], 1)); });
    it('does not trim', function() { assert.equal(false, lib.length(' hello ', 5)); });
  });
  describe('lessThan', function() {
    it('lt', function() { assert.equal(true, lib.lessThan('5', 6)); });
    it('eq', function() { assert.equal(false, lib.lessThan('5', 5)); });
    it('gt', function() { assert.equal(false, lib.lessThan('5', 4)); });
    it('floats', function() { assert.equal(true, lib.lessThan('3.14', 3.15)); });
    it('negative numbers', function() { assert.equal(true, lib.lessThan('-2', -1)); })
    it('null < 100', function() { assert.equal(false, lib.lessThan(null, 100)); });
    it('3 < 100', function() { assert.equal(false, lib.lessThan(3, 100)); });
    it('b < z', function() { assert.equal(false, lib.lessThan('b', 'z')); });
    it('true < 100', function() { assert.equal(false, lib.lessThan(true, 100)); });
  });
  describe('max', function() {
    it('lt', function() { assert.equal(true, lib.max('5', 6)); });
    it('eq', function() { assert.equal(true, lib.max('5', 5)); });
    it('gt', function() { assert.equal(false, lib.max('5', 4)); });
    it('floats', function() { assert.equal(true, lib.max('3.14', 3.15)); });
    it('negative numbers', function() { assert.equal(true, lib.max('-2', -1)); })
    it('null <= 100', function() { assert.equal(false, lib.max(null, 100)); });
    it('3 <= 100', function() { assert.equal(false, lib.max(3, 100)); });
    it('b <= z', function() { assert.equal(false, lib.max('b', 'z')); });
    it('true <= 100', function() { assert.equal(false, lib.max(true, 100)); });
  });
  describe('maxLength', function() {
    it('lt', function() { assert.equal(true, lib.maxLength('hello', 6)); });
    it('eq', function() { assert.equal(true, lib.maxLength('hello', 5)); });
    it('gt', function() { assert.equal(false, lib.maxLength('hello', 4)); });
    it('null', function() { assert.equal(false, lib.maxLength(null, 100)); });
    it('no length', function() { assert.equal(false, lib.maxLength({}, 100)); });
    it('arraylt', function() { assert.equal(true, lib.maxLength([1,2], 3)); });
    it('arrayeq', function() { assert.equal(true, lib.maxLength([1,2], 2)); });
    it('arraygt', function() { assert.equal(false, lib.maxLength([1,2], 1)); });
    it('does not trim', function() { assert.equal(false, lib.maxLength('  hello  ', 6)); });
  });
  describe('min', function() {
    it('lt', function() { assert.equal(false, lib.min('5', 6)); });
    it('eq', function() { assert.equal(true, lib.min('5', 5)); });
    it('gt', function() { assert.equal(true, lib.min('5', 4)); });
    it('floats', function() { assert.equal(true, lib.min('3.14', 3.13)); });
    it('negative numbers', function() { assert.equal(true, lib.min('-1', -2)); })
    it('null >= -1', function() { assert.equal(false, lib.min(null, -1)); });
    it('3 >= 2', function() { assert.equal(false, lib.min(3, 2)); });
    it('b >= a', function() { assert.equal(false, lib.min('b', 'a')); });
    it('true >= -1', function() { assert.equal(false, lib.min(true, -1)); });
  });
  describe('minLength', function() {
    it('lt', function() { assert.equal(false, lib.minLength('hello', 6)); });
    it('eq', function() { assert.equal(true, lib.minLength('hello', 5)); });
    it('gt', function() { assert.equal(true, lib.minLength('hello', 4)); });
    it('null', function() { assert.equal(false, lib.minLength(null, 0)); });
    it('no length', function() { assert.equal(false, lib.minLength({}, 0)); });
    it('arraylt', function() { assert.equal(false, lib.minLength([1,2], 3)); });
    it('arrayeq', function() { assert.equal(true, lib.minLength([1,2], 2)); });
    it('arraygt', function() { assert.equal(true, lib.minLength([1,2], 1)); });
    it('does not trim', function() { assert.equal(true, lib.minLength('  hello   ', 6)); });
  });
  describe('number', function() {
    it('01234567899876543210', function() {
      assert.equal(true, lib.number('01234567899876543210'));
    });
    it('-4', function() { assert.equal(true, lib.number('-4')); });
    it('+4', function() { assert.equal(true, lib.number('+4')); });
    it('--4', function() { assert.equal(false, lib.number('--4')); });
    it('1.3', function() { assert.equal(true, lib.number('1.3')); });
    it(' 4 ', function() { assert.equal(true, lib.number(' 4 ')); });
    it(' 4 6 ', function() { assert.equal(false, lib.number(' 4 6 ')); });
    it('null', function() { assert.equal(false, lib.number(null)); });
    it('boolean', function() { assert.equal(false, lib.number(true)); });
    it('a', function() { assert.equal(false, lib.number('a')); });
    it('number', function() { assert.equal(false, lib.number(3)); });
  });
  describe('numeric', function() {
    it('01234567899876543210', function() {
      assert.equal(true, lib.numeric('01234567899876543210'));
    });
    it('-4', function() { assert.equal(false, lib.numeric('-4')); });
    it('+4', function() { assert.equal(false, lib.numeric('+4')); });
    it('--4', function() { assert.equal(false, lib.numeric('--4')); });
    it('1.3', function() { assert.equal(false, lib.numeric('1.3')); });
    it(' 4 ', function() { assert.equal(false, lib.numeric(' 4 ')); });
    it(' 4 6 ', function() { assert.equal(false, lib.numeric(' 4 6 ')); });
    it('null', function() { assert.equal(false, lib.numeric(null)); });
    it('boolean', function() { assert.equal(false, lib.numeric(true)); });
    it('a', function() { assert.equal(false, lib.numeric('a')); });
    it('number', function() { assert.equal(false, lib.numeric(3)); });
  });
  describe('required', function() {
    it('non-whitespace', function() { assert.equal(true, lib.required('a')); });
    it('empty string', function() { assert.equal(false, lib.required('')); });
    it('whitespace', function() { assert.equal(false, lib.required(' \t\r\n')); });
    it('null', function() { assert.equal(false, lib.required(null)); });
    it('{}', function() { assert.equal(false, lib.required({})); });
    it('boolean true', function() { assert.equal(false, lib.required({})); });
  });
  describe('startsWith', function() {
    it('normal case', function() { assert.equal(true, lib.startsWith('kilgore trout','kilg')); });
    it('no match', function() { assert.equal(false, lib.startsWith('kilgore trout','a')); });
    it('spaces', function() { assert.equal(true, lib.startsWith('kilgore trout','kilgore ')); });
    it('null', function() { assert.equal(false, lib.startsWith(null)); });
    it('null searchString', function() { assert.equal(false, lib.startsWith('kilgore trout', null)); });
    it('non-string searchString', function() { assert.equal(false, lib.startsWith('kilgore trout', 3)); });
    it('does not trim', function() { assert.equal(false, lib.startsWith('   kilgore trout','kilg')); });
    it('does not trim searchString', function() { assert.equal(false, lib.startsWith('kilgore trout',' kilg')); });
    it('does not trim searchString2', function() { assert.equal(true, lib.startsWith(' kilgore trout',' kilg')); });
    it('empty string', function() { assert.equal(false, lib.startsWith('','kilgore ')); });
  });
  describe('url', function() {
    it('matches http', function() { assert.equal(true, lib.url('http://react-formstate-validation.test')); });
    it('matches https', function() { assert.equal(true, lib.url('https://react-formstate-validation.test')); });
    it('matches ftp', function() { assert.equal(true, lib.url('ftp://react-formstate-validation.test')); });
    it('does not match relative', function() { assert.equal(false, lib.url('/react-formstate-validation.test')); });
    it('does not match schema relative', function() { assert.equal(false, lib.url('//react-formstate-validation.test')); });
    it('does not match site relative', function() { assert.equal(false, lib.url('~/react-formstate-validation.test')); });
    it('does not match gopher', function() { assert.equal(false, lib.url('gopher://react-formstate-validation.test')); });
    it('matches null', function() { assert.equal(true, lib.url(null)); });
    it('matches empty string', function() { assert.equal(true, lib.url('')); });
    it('matches blank string', function() { assert.equal(true, lib.url('   ')); });
    it('does not crash on an integer', function() { assert.equal(false, lib.url(3)); });
    it('does not crash on an object', function() { assert.equal(false, lib.url({x: 3})); });
  });
});

function mock(validations) {
  return {
    setRequired: function(f) {
      validations.setRequired = f;
    },
    registerValidation: function(name, f) {
      validations[name] = f;
    }
  };
}

var v = {},
  adapter = new rfsv.FormStateAdapter(rfsv.library, rfsv.content, rfsv.aliases);

adapter.plugInto(mock(v));

describe('No content and no aliases', function() {
  describe('#minLength', function() {
    it('returns "[label] is invalid"', function() {
      var noContent = {};
      new rfsv.FormStateAdapter(rfsv.library).plugInto(mock(noContent));
      assert.equal('Password is invalid', noContent['minLength']('abc','Password',8));
    });
  });
});

describe('Messages', function() {
  describe('if no label', function() {
    it('it does not crash', function() {
      assert.equal('undefined must be an email address', v['email']('',undefined));
    });
  });
  describe('#email', function() {
    it('has a message', function() {
      assert.equal('Field must be an email address', v['email']('','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['email']('a@b.c','Field'));
    });
  });
  describe('#equals', function() {
    it('has a message', function() {
      assert.equal('Field must equal true', v['equals']('','Field',true));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['equals'](true,'Field',true));
    });
  });
  describe('#exists', function() {
    it('has a message', function() {
      assert.equal('Field is invalid', v['exists'](null,'Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['exists']('','Field'));
    });
  });
  describe('#greaterThan', function() {
    it('has a message', function() {
      assert.equal('Field must be greater than 3', v['greaterThan']('2','Field',3));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['greaterThan']('4','Field',3));
    });
  });
  describe('#integer', function() {
    it('has a message', function() {
      assert.equal('Field must be an integer', v['integer']('','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['integer']('4','Field'));
    });
  });
  describe('#length', function() {
    it('has a message', function() {
      assert.equal('Field must have length equal to 8', v['length']('','Field',8));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['length']('4','Field',1));
    });
  });
  describe('#lessThan', function() {
    it('has a message', function() {
      assert.equal('Field must be less than 8', v['lessThan']('','Field',8));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['lessThan']('4','Field',5));
    });
  });
  describe('#max', function() {
    it('has a message', function() {
      assert.equal('Field must be at most 8', v['max']('','Field',8));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['max']('4','Field',5));
    });
  });
  describe('#maxLength', function() {
    it('has a message', function() {
      assert.equal('Field must have a maximum length of 2', v['maxLength']('123','Field',2));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['maxLength']('4','Field',5));
    });
  });
  describe('#min', function() {
    it('has a message', function() {
      assert.equal('Field must be at least 8', v['min']('','Field',8));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['min']('46','Field',5));
    });
  });
  describe('#minLength', function() {
    it('has a message', function() {
      assert.equal('Field must have a minimum length of 2', v['minLength']('1','Field',2));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['minLength']('423','Field',1));
    });
  });
  describe('#number', function() {
    it('has a message', function() {
      assert.equal('Field must be a number', v['number']('','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['number']('46','Field'));
    });
  });
  describe('#numeric', function() {
    it('has a message', function() {
      assert.equal('Field must only contain numbers', v['numeric']('','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['numeric']('46','Field'));
    });
  });
  describe('#regex', function() {
    it('has a message', function() {
      assert.equal('Field is invalid', v['regex']('a','Field',/^[0-9]+$/));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['regex']('123','Field',/^[0-9]+$/));
    });
  });
  describe('#required', function() {
    it('has a message', function() {
      assert.equal('Field is required', v['required']('','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['required']('46','Field'));
    });
  });
  describe('#startsWith', function() {
    it('has a message', function() {
      assert.equal('Field must start with f', v['startsWith']('','Field','f'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['startsWith']('f','Field','f'));
    });
  });
  describe('#url', function() {
    it('has a message', function() {
      assert.equal('Field must be a url', v['url']('badUrl','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['url']('http://test.test','Field'));
    });
  });
});


describe('Aliases', function() {
  describe('#eq', function() {
    it('has a message', function() {
      assert.equal('Field must equal true', v['eq']('','Field',true));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['eq'](true,'Field',true));
    });
  });
  describe('#gt', function() {
    it('has a message', function() {
      assert.equal('Field must be greater than 3', v['gt']('2','Field',3));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['gt']('4','Field',3));
    });
  });
  describe('#int', function() {
    it('has a message', function() {
      assert.equal('Field must be an integer', v['int']('','Field'));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['int']('4','Field'));
    });
  });
  describe('#len', function() {
    it('has a message', function() {
      assert.equal('Field must have length equal to 8', v['len']('','Field',8));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['len']('4','Field',1));
    });
  });
  describe('#lt', function() {
    it('has a message', function() {
      assert.equal('Field must be less than 8', v['lt']('','Field',8));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['lt']('4','Field',5));
    });
  });
  describe('#maxlen', function() {
    it('has a message', function() {
      assert.equal('Field must have a maximum length of 2', v['maxlen']('123','Field',2));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['maxlen']('4','Field',5));
    });
  });
  describe('#xlen', function() {
    it('has a message', function() {
      assert.equal('Field must have a maximum length of 2', v['xlen']('123','Field',2));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['xlen']('4','Field',5));
    });
  });
  describe('#minlen', function() {
    it('has a message', function() {
      assert.equal('Field must have a minimum length of 2', v['minlen']('1','Field',2));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['minlen']('423','Field',1));
    });
  });
  describe('#nlen', function() {
    it('has a message', function() {
      assert.equal('Field must have a minimum length of 2', v['nlen']('1','Field',2));
    });
    it('might not return a message', function() {
      assert.equal(undefined, v['nlen']('423','Field',1));
    });
  });
});
