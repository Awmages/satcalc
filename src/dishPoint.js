import { cross, dot } from 'mathjs';

const earthRadius = 6371;
const aGSO = 42164;

//Refer to page 80 of Satellite Communications ISBN: 0-07-146298-8
//Calculates dish azimuth and look angle to geoSat body
//returns array [dish azimuth, dish elevation, lnb skew, visibility check]
//skipped code after Alex discovered satelliteJS and tleJS does it and better.
export function getEarthStationPointing(
  earthSationLat,
  earthSationLong,
  subSatPoint,
  lookhorizon = 5
) {
  const earthSationLatRad = (earthSationLat * Math.PI) / 180;
  const earthSationLongRad = (earthSationLong * Math.PI) / 180;
  const subSatPointRad = (subSatPoint * Math.PI) / 180;
  const lookhorizonRad = ((90 + lookhorizon) * Math.PI) / 180;

  //Calculate Azimuth
  const angleB = earthSationLongRad - subSatPointRad;
  const angleb = Math.acos(Math.cos(angleB) * Math.cos(earthSationLatRad));
  const angleA = Math.asin(Math.sin(Math.abs(angleB)) / Math.sin(angleb));
  let dishAzimuth = 0;
  switch (true) {
    case earthSationLat < 0 && angleB < 0:
      dishAzimuth = angleA;
      break;
    case earthSationLat < 0 && angleB > 0:
      dishAzimuth = 360 - (angleA * 180) / Math.PI;
      break;
    case earthSationLat > 0 && angleB < 0:
      dishAzimuth = 180 - (angleA * 180) / Math.PI;
      break;
    case earthSationLat > 0 && angleB > 0:
      dishAzimuth = 180 + (angleA * 180) / Math.PI;
      break;
  }
  //calculate Elevation
  const rangeD = Math.sqrt(
    Math.pow(earthRadius, 2) +
      Math.pow(aGSO, 2) -
      2 * earthRadius * aGSO * Math.cos(angleb)
  );
  const dishElevation =
    (Math.acos((aGSO / rangeD) * Math.sin(angleb)) * 180) / Math.PI;

  //Calculate LNB skew (polarization)
  const earthStationVectorX =
    earthRadius * Math.cos(earthSationLatRad) * Math.cos(angleB);
  const earthStationVectorY =
    earthRadius * Math.cos(earthSationLatRad) * Math.sin(angleB);
  const earthStationVectorZ = earthRadius * Math.sin(earthSationLatRad);
  //r
  const localGravDirection = [
    -earthStationVectorX,
    -earthStationVectorY,
    -earthStationVectorZ,
  ];

  //k
  const propDirection = [
    earthStationVectorX - aGSO,
    earthStationVectorY,
    earthStationVectorZ,
  ];

  //e
  const polarVector = [0, 0, 1];

  //f= k X r (k cross r)
  const vectorCrossF = cross(propDirection, localGravDirection);

  //Mag of f
  const magF = Math.sqrt(
    Math.pow(vectorCrossF[0], 2) +
      Math.pow(vectorCrossF[1], 2) +
      Math.pow(vectorCrossF[2], 2)
  );

  //g = k x e (k cross e)
  const vectorCrossG = cross(propDirection, polarVector);

  //h = g x k (g cross k)
  const vectorCrossH = cross(vectorCrossG, propDirection);

  //Mag of h
  const magH = Math.sqrt(
    Math.pow(vectorCrossH[0], 2) +
      Math.pow(vectorCrossH[1], 2) +
      Math.pow(vectorCrossH[2], 2)
  );

  //p = h/|h|
  const unitPolVector = [
    vectorCrossH[0] / magH,
    vectorCrossH[1] / magH,
    vectorCrossH[2] / magH,
  ];

  //p*f (p dot f)
  const pDotF = dot(unitPolVector, vectorCrossF);

  let lnbSkew = (Math.asin(pDotF / magF) * 180) / Math.PI;

  //Calculate limits of visibility
  const visAngleS = Math.asin((earthRadius / aGSO) * Math.sin(lookhorizonRad));
  const visAngleb = 1 * Math.PI - lookhorizonRad - visAngleS;
  const visAngleB = Math.acos(
    Math.cos(visAngleb) / Math.cos(earthSationLatRad)
  );
  const visLimitEast = earthSationLong + (visAngleB * 180) / Math.PI;
  const visLimitWest = earthSationLong - (visAngleB * 180) / Math.PI;

  let satVis = false;
  if (visLimitWest <= subSatPoint && subSatPoint <= visLimitEast) {
    satVis = true;
  }

  //round for readibility
  const dishAzimuthRound = dishAzimuth.toFixed(1);
  const dishElevationRound = dishElevation.toFixed(1);
  const lnbSkewRound = lnbSkew.toFixed(1);

  return {
    dishAzimuth: dishAzimuthRound,
    dishElevation: dishElevationRound,
    lnbSkew: lnbSkewRound,
    satVis,
  };
}
