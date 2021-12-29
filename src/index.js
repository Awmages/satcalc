export { toSigOverNoise, getEbNo } from './dsp.js';
export { getEarthStationPointing } from './dishPoint.js';

// import { toSigOverNoise, getEbNo } from './dsp.js';
// const testval = toSigOverNoise(10, 8);
// console.log(getEbNo(testval, 0.75, 2, 8));
// console.log(toSigOverNoise(9, 8));

import { getEarthStationPointing } from './dishPoint.js';
import { getSatelliteInfo, getLatLngObj } from 'tle.js';

const tle = `SES-3 
1 37748U 11035A   21362.04287633   -.00000082  00000-0  00000+0 0  9996
2 37748  0.0179 355.6951 0002678  276.5862  96.8813 1.00271361 38334`;

// const tle = `ISS (ZARYA)
// 1 25544U 98067A   17206.18396726  .00001961  00000-0  36771-4 0  9993
// 2 25544  51.6400 208.9163 0006317  69.9862  25.2906 15.54225995 67660`;

// console.log(getSatelliteInfo(tle, 37.71, -97.43, 0.406908));
console.log(getLatLngObj(tle));
