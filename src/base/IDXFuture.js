import { MathX, DataStructures } from "@nuuuwan/utils-js-dev";

const BASE = 16;
const N_SEGMENTS = 5;
const N_DIGITS = 4;

export default class IDXFuture {
  static getRandomID() {
    return DataStructures.range(0, N_SEGMENTS)
      .map((i) => IDXFuture.getRandomIDSegment(N_DIGITS))
      .join("-");
  }
  static getRandomIDSegment(nDigits) {
    const minValue = Math.pow(BASE, nDigits - 1);
    const maxValue = Math.pow(BASE, nDigits);
    const value = MathX.randomInt(minValue, maxValue);
    return value.toString(BASE);
  }
}
