import Math from "./Math";

test("shuffle", async () => {
  const arr = [1, 2, 3, 4];
  const arrShuffled = Math.randomShuffle(arr);
  expect(arrShuffled.length).toBe(4);
});
