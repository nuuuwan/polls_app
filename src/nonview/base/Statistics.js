import { DataStructures } from "@nuuuwan/utils-js-dev";
const cdf = require("binomial-cdf");

export default class Statistics {
  static MIN_STATISTICAL_N = 30;

  static getErrorBounds(nObserved, npObserved) {
    const CONFIDENCE = 0.95;
    const pObserved = npObserved / nObserved;
    const Q = 100;
    let [lower, upper] = [1, 1];

    for (let i in DataStructures.range(0, Q + 1)) {
      const delta = i / Q;
      const pActualLower = Math.max(0, pObserved - delta);
      const cdfForObservedLower = cdf(npObserved, nObserved, pActualLower);
      const pActualUpper = Math.min(1, pObserved + delta);
      const cdfForObservedUpper = cdf(npObserved, nObserved, pActualUpper);

      const span = cdfForObservedLower - cdfForObservedUpper;
      if (span > CONFIDENCE) {
        lower = pActualLower;
        upper = pActualUpper;
        break;
      }
    }
    lower = Math.min(upper, lower);
    const stdev = Math.min(pObserved - lower, upper - pObserved) / 2;
    return { lower, upper, p: pObserved, stdev };
  }
}
