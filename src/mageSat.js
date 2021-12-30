//temp TLE
import { sin } from 'mathjs';
import { data } from './tleTest.js';
import {
  getRadToDeg,
  getDegToRad,
  getTleJsonParser,
  getTleLine1,
  getTleLine2,
} from './utils.js';

const jDateReference = 2415020;
const jDate2000 = 2451543.5;
const jCentury = 36525;

export function getSubSatPoint() {
  const tle1 = getTleLine1();
  const tle2 = getTleLine2();
  const jDate =
    jDate2000 +
    parseFloat(tle1.satEpochYear) * 365 +
    Math.floor((parseFloat(tle1.satEpochYear) * 2) / 4) +
    parseFloat(tle1.satEpochDay);
  const jT = (jDate - jDateReference) / jCentury;

  //uT is decimal of the epoch x 360 deg
  const uT = (parseFloat(tle1.satEpochDay) - parseInt(tle1.satEpochDay)) * 360;
  const GST = (99.961 + 36000.7689 * jT + 0.0004 * Math.pow(jT, 2) + uT) % 360;

  //true eccentricity v
  const meanAnomalyRad = getDegToRad(parseFloat(tle2.satMeanAnomaly));
  const vEcc = getRadToDeg(
    meanAnomalyRad +
      2 * parseFloat('.' + tle2.satEccentricity) * sin(meanAnomalyRad)
  );
  //mean subSatPoint (For GEO sats)
  const subSatPoint =
    parseFloat(tle2.SatPerigee) +
    parseFloat(tle2.satAscension) +
    parseFloat(tle2.satMeanAnomaly) -
    GST;
  console.log(subSatPoint);
}
