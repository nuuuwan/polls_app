import MathXFuture from "./MathXFuture";

test("shuffle", async () => {
  const arr = [1,2,3,4];
  const arrShuffled = MathXFuture.randomShuffle(arr);
  expect(arrShuffled.length).toBe(4);
});
