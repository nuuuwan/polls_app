import { DataStructures } from "@nuuuwan/utils-js-dev";
const cdf = require("binomial-cdf");

export default class StatisticsXFuture {
  static MIN_STATISTICAL_N = 1;

  static getErrorBounds(nObserved, npObserved) {
    const CONFIDENCE = 0.95;
    const N_STDEV = 2;
    const pObserved = npObserved / nObserved;
    const Q = 100;
    let [lower, upper] = [1, 1];

    for (let i in DataStructures.range(0, Q + 1)) {
      const pActualLower = i / Q;
      const cdfForObservedLower = cdf(npObserved, nObserved, pActualLower);
      const pActualUpper = 1 - i / Q;
      const cdfForObservedUpper = cdf(npObserved, nObserved, pActualUpper);

      const span = cdfForObservedLower - cdfForObservedUpper;
      if (span < CONFIDENCE) {
        lower = pActualLower;
        upper = pActualUpper;
        break;
      }
    }
    lower = Math.min(upper, lower);
    return { lower, upper, p: pObserved, stdev: (upper - lower) / N_STDEV };
  }
}
