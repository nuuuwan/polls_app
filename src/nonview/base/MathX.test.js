import MathX from "./MathX";

test("shuffle", async () => {
  const arr = [1, 2, 3, 4];
  const arrShuffled = MathX.randomShuffle(arr);
  expect(arrShuffled.length).toBe(4);
});
