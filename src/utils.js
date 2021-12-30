import { data } from './tleTest.js';

export function getRadToDeg(rads) {
  return rads * (180 / Math.PI);
}
export function getDegToRad(degs) {
  return (degs * Math.PI) / 180;
}

//Parses based off NASA TLE API
export function getTleJsonParser() {
  //satInfo is temp
  let satInfo = data[0].member[0];
  let satId = satInfo.satelliteId;
  let satName = satInfo.name;
  let satDate = satInfo.date;
  let satLine1 = satInfo.line1;
  let satLine2 = satInfo.line2;
  return { satId, satName, satDate, satLine1, satLine2 };
}

//converts TLE Line1 from string to array of props needed, formatted to work with NASA TLE API
export function getTleLine1() {
  //line1 is temp here, import when ready
  let line1 = data[0].member[0].line1;
  let line1Split = line1
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
  const satId = line1Split[1].replace(/[A-Z]/g, '');
  const satClassification = line1Split[1].replace(/[0-9]/g, '');
  const satLine1 = line1Split[0];
  const satLaunchYear = line1Split[2].substring(0, 2);
  const satLaunchNumber = line1Split[2].substring(2, 5);
  const satLaunchPiece = line1Split[2].substring(5, 6);
  const satEpochYear = line1Split[3].substring(0, 2);
  const satEpochDay = line1Split[3].substring(2);
  const satFirstDervMeanMotion = line1Split[4];
  const satSecDervMeanMotion = line1Split[5];
  const satAtmoDrag = line1Split[6];
  const satEphemeris = line1Split[7];
  const satElSetNum = line1Split[8].substring(0, 3);
  const satChecksum1 = line1Split[8].substring(3);

  return {
    satLine1,
    satId,
    satClassification,
    satLaunchYear,
    satLaunchNumber,
    satLaunchPiece,
    satEpochYear,
    satEpochDay,
    satFirstDervMeanMotion,
    satSecDervMeanMotion,
    satAtmoDrag,
    satEphemeris,
    satElSetNum,
    satChecksum1,
  };
}

export function getTleLine2() {
  //line2 is temp here, import when ready
  let line2 = data[0].member[0].line2;
  let line2Split = line2
    .replace(/,/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ');
  const satLine2 = line2Split[0];
  const satId = line2Split[1];
  const satInclination = line2Split[2];
  const satAscension = line2Split[3];
  const satEccentricity = line2Split[4];
  const SatPerigee = line2Split[5];
  const satMeanAnomaly = line2Split[6];
  const satMeanMotion = line2Split[7].substring(0, 11);
  const satRevEpoch = line2Split[7].substring(11, 16);
  const satChecksum2 = line2Split[7].substring(16);
  return {
    satLine2,
    satId,
    satInclination,
    satAscension,
    satEccentricity,
    SatPerigee,
    satMeanAnomaly,
    satMeanMotion,
    satRevEpoch,
    satChecksum2,
  };
}
