export default class StatisticsXFuture {
  static getErrorBounds(n, np) {
    const p = np / n;
    const stdev = Math.sqrt(np * (1 - p)) / n;
    const range = stdev * 2;
    const [lower, upper] = [p - range, p + range].map((x) =>
      Math.min(Math.max(x, 0), 1)
    );
    return { lower, upper, p, stdev };
  }
}
