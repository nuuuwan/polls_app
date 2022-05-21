import { DataStructures } from "@nuuuwan/utils-js-dev";
const cdf = require("binomial-cdf");

export default class StatisticsXFuture {
  static MIN_STATISTICAL_N = 30;

  static getErrorBounds(nObserved, npObserved) {
    const SIGNIFICANCE = 0.05;
    const N_STDEV = 2;
    const pObserved = npObserved / nObserved;
    const Q = 100;
    let [lower, upper] = [1, 1];
    for (let i in DataStructures.range(0, Q + 1)) {
      const pActual = i / Q;
      const cdfForObserved = cdf(npObserved, nObserved, pActual);

      if (lower === 1 && cdfForObserved < 1 - SIGNIFICANCE / 2) {
        lower = pActual;
      }
      if (cdfForObserved >= SIGNIFICANCE / 2) {
        upper = pActual;
      }
    }

    lower = Math.min(upper, lower);

    return { lower, upper, p: pObserved, stdev: (upper - lower) / N_STDEV };
  }
}
