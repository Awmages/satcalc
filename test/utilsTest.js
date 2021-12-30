import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var assert = require('assert');

import { getDegToRad, getRadToDeg } from '../src/utils.js';

describe('utils test', () => {
  describe('getDegToRad', () => {
    var tests = [
      { args: '10', expected: 0.17453292519943295 },
      { args: '180', expected: 3.141592653589793 },
      { args: '360', expected: 6.283185307179586 },
    ];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = getDegToRad(tests.args);
        assert.equal(result, tests.expected);
      });
    });
  });
  describe('getRadToDeg', () => {
    var tests = [
      { args: '10', expected: 572.9577951308232 },
      { args: '3.14', expected: 179.9087476710785 },
      { args: '6.28', expected: 359.817495342157 },
    ];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = getRadToDeg(tests.args);
        assert.equal(result, tests.expected);
      });
    });
  });
});
