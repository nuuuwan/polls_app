import StatisticsXFuture from "./StatisticsXFuture";

test("getErrorBounds", () => {
  const bounds = StatisticsXFuture.getErrorBounds(
    10, 5,
  );

  expect(bounds.lower).toBeCloseTo(0.21, 6);
  expect(bounds.upper).toBeCloseTo(0.79, 6);
  expect(bounds.p).toBeCloseTo(0.5, 6);
  expect(bounds.stdev).toBeCloseTo(0.145, 6);

});
