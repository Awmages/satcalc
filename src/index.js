export { toSigOverNoise, getEbNo } from './dsp.js';
export { getEarthStationPointing } from './dishPoint.js';

const julianDateReference = 2415020;

// import { toSigOverNoise, getEbNo } from './dsp.js';
// const testval = toSigOverNoise(10, 8);
// console.log(getEbNo(testval, 0.75, 2, 8));
// console.log(toSigOverNoise(9, 8));

//import { getEarthStationPointing } from './dishPoint.js';

import {
  getRadToDeg,
  getDegToRad,
  getTleJsonParser,
  getTleLine1,
  getTleLine2,
} from './utils.js';

import { getSubSatPoint } from './mageSat.js';
// console.log(getTleLine1().satEpochYear);
// console.log(getTleLine2());
// let date = new Date(2010, 0, 18, 0, 0, 0);
// console.log(new Date().getTime() / 86400000 + 2440587.5);
// console.log(new Date(2005, 1, 1, -6) / 86400000 + 2440587.5);
getSubSatPoint();
console.log(getTleLine1());
