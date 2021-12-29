export function toSigOverNoise(sigPlNoOvNo, toDec = 4) {
  //sigPlNoOvNo is signal plus Noise Over Noise or M1-M2
  const a = (1.0 * sigPlNoOvNo) / 10;
  const b = 1.0 * Math.pow(10, a) - 1;
  const siOvNo = (10.0 * Math.log(b)) / Math.log(10.0);
  return siOvNo.toFixed(toDec);
}

export function getEbNo(siOvNo, fec, bit, toDec = 4) {
  //fec is forward error correction ratio (Ex: 0.75)
  //bit is transmission bits per symbol (ex: BPSK=1, QPSK=2, 8PSK=3, 16QAM=4, 32APSK=5)
  const fecCal = (10 * Math.log(fec)) / Math.log(10.0);
  const bitCal = (10 * Math.log(bit)) / Math.log(10.0);
  const ebNo = siOvNo - fecCal - bitCal;
  return ebNo.toFixed(toDec);
}
