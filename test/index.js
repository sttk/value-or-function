'use strict';

var expect = require('expect');

var normalize = require('../');

describe('normalize', function() {

  it('compares a type and the type of a value', function(done) {
    var type = 'string';
    var value = 'test string';
    var result = normalize(type, value);
    expect(result).toEqual(value);
    done();
  });

  it('returns null if value does not match type', function(done) {
    var type = 'string';
    var value = 1;
    var result = normalize(type, value);
    expect(result).toEqual(null);
    done();
  });

  it('calls the value if it is a function', function(done) {
    var type = 'string';
    var expected = 'test string';
    var value = function() {
      return expected;
    };
    var result = normalize(type, value);
    expect(result).toEqual(expected);
    done();
  });

  it('calls the function, passing extra arguments', function(done) {
    var type = 'string';
    var expected = 'test string';
    var value = function(arg) {
      return arg;
    };
    var result = normalize(type, value, expected);
    expect(result).toEqual(expected);
    done();
  });
});

describe('normalize.object', function() {

  it('compares value to typeof object', function(done) {
    var obj = {};
    var arr = [];
    var numObj = new Number(1);
    var strObj = new String('test');
    var objResult = normalize.object(obj);
    var arrResult = normalize.object(arr);
    var numObjResult = normalize.object(numObj);
    var strObjResult = normalize.object(strObj);
    expect(objResult).toEqual(obj);
    expect(arrResult).toEqual(arr);
    expect(numObjResult).toEqual(numObj);
    expect(strObjResult).toEqual(strObj);
    done();
  });
});

describe('normalize.object', function() {

  it('compares value to typeof object', function(done) {
    var obj = {};
    var arr = [];
    var numObj = new Number(1);
    var strObj = new String('test');
    var objResult = normalize.object(obj);
    var arrResult = normalize.object(arr);
    var numObjResult = normalize.object(numObj);
    var strObjResult = normalize.object(strObj);
    expect(objResult).toEqual(obj);
    expect(arrResult).toEqual(arr);
    expect(numObjResult).toEqual(numObj);
    expect(strObjResult).toEqual(strObj);
    done();
  });
});

describe('normalize.number', function() {

  it('compares value to typeof number', function(done) {
    var value = 1;
    var result = normalize.number(value);
    expect(result).toEqual(value);
    done();
  });
});

describe('normalize.string', function() {

  it('compares value to typeof string', function(done) {
    var value = 'test string';
    var result = normalize.string(value);
    expect(result).toEqual(value);
    done();
  });
});

describe('normalize.symbol', function() {

  it('compares value to typeof symbol', function(done) {
    if (!global.Symbol) {
      console.log('Only available on platforms that support Symbol');
      this.skip();
      return;
    }

    var value = Symbol();
    var result = normalize.symbol(value);
    expect(result).toEqual(value);
    done();
  });
});

describe('normalize.boolean', function() {

  it('compares value to typeof boolean', function(done) {
    var value = true;
    var result = normalize.boolean(value);
    expect(result).toEqual(value);
    done();
  });
});

describe('normalize.function', function() {

  it('compares value to typeof function', function(done) {
    var value = function() {};
    var result = normalize.function(value);
    expect(result).toEqual(value);
    done();
  });

  it('never calls the function', function(done) {
    var value = expect.createSpy();
    var result = normalize.function(value);
    expect(result).toEqual(value);
    expect(value).toNotHaveBeenCalled();
    done();
  });
});

describe('normalize.undefined', function() {

  it('compares value to typeof undefined', function(done) {
    var value = undefined;
    var result = normalize.undefined(value);
    expect(result).toEqual(value);
    done();
  });
});