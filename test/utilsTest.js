import { createRequire } from 'module';
const require = createRequire(import.meta.url);
var assert = require('assert');

import {
  getDegToRad,
  getRadToDeg,
  getTleLine1,
  getTleLine2,
} from '../src/utils.js';
import { data } from './tleTest.js';

describe('utils test', () => {
  // describe('getDegToRad', () => {
  //   var tests = [
  //     { args: '10', expected: 0.17453292519943295 },
  //     { args: '180', expected: 3.141592653589793 },
  //     { args: '360', expected: 6.283185307179586 },
  //   ];
  //   tests.forEach(function (tests) {
  //     it('should be ' + tests.expected, () => {
  //       const result = getDegToRad(tests.args);
  //       assert.equal(result, tests.expected);
  //     });
  //   });
  // });
  // describe('getRadToDeg', () => {
  //   var tests = [
  //     { args: '10', expected: 572.9577951308232 },
  //     { args: '3.14', expected: 179.9087476710785 },
  //     { args: '6.28', expected: 359.817495342157 },
  //   ];
  //   tests.forEach(function (tests) {
  //     it('should be ' + tests.expected, () => {
  //       const result = getRadToDeg(tests.args);
  //       assert.equal(result, tests.expected);
  //     });
  //   });
  // });
  describe('getTleLine1', () => {
    var tests = [
      {
        args: data[0].member[0].line1,
        expected: {
          satAtmoDrag: '00000+0',
          satChecksum1: '7',
          satClassification: 'U',
          satElSetNum: '152',
          satEphemeris: '0',
          satEpochDay: '124.94126775',
          satEpochYear: '05',
          satFirstDervMeanMotion: '-.00000018',
          satId: '28358',
          satLaunchNumber: '022',
          satLaunchPiece: 'A',
          satLaunchYear: '04',
          satLine1: '1',
          satSecDervMeanMotion: '00000-0',
        },
      },
    ];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = getTleLine1(tests.args);
        assert.deepEqual(result, tests.expected);
      });
    });
  });

  describe('getTleLine2', () => {
    var tests = [
      {
        args: data[0].member[0].line2,
        expected: {
          SatPerigee: '59.4312',
          satAscension: '311.0487',
          satChecksum2: '',
          satEccentricity: '0000613',
          satId: '28358',
          satInclination: '0.0079',
          satLine2: '2',
          satMeanAnomaly: '190.2817',
          satMeanMotion: '1.00271159',
          satRevEpoch: '',
        },
      },
    ];
    tests.forEach(function (tests) {
      it('should be ' + tests.expected, () => {
        const result = getTleLine2(tests.args);
        assert.deepEqual(result, tests.expected);
      });
    });
  });
});
