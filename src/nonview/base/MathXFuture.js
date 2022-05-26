export default class MathXFuture {
  static randomShuffle(arr) {
    let curI = arr.length;
    while (curI !== 0) {
      const randI = Math.floor(Math.random() * curI);
      curI--;
      [arr[curI], arr[randI]] = [arr[randI], arr[curI]];
    }
    return arr;
  }
}
