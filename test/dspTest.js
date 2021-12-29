import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var assert = require('assert');
import { toSigOverNoise, getEbNo } from '../src/dsp.js';
import { earthStationDishPointing } from '../src/dishPoint.js';

describe('dsp test', () => {
  describe('toSigOverNoise', () => {
    var tests = [{ args: '9', expected: '8.4156' }];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = toSigOverNoise(tests.args[0]);
        assert.equal(result, tests.expected);
      });
    });
  });
  describe('getEbNo', () => {
    var tests = [
      { args: [toSigOverNoise(10), '0.75', '2'], expected: '7.7815' },
    ];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = getEbNo(tests.args[0], tests.args[1], tests.args[2]);
        assert.equal(result, tests.expected);
      });
    });
  });
  describe('earthStationPointing', () => {
    var tests = [
      {
        args: ['37.71', '-97.43', '-103'],
        expected: {
          dishAzimuth: '189.1',
          dishElevation: '45.9',
          lnbSkew: '7.2',
          satVis: true,
        },
      },
    ];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = earthStationDishPointing(
          tests.args[0],
          tests.args[1],
          tests.args[2]
        );
        assert.deepEqual(result, tests.expected);
      });
    });
  });
});
