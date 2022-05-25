import IDXFuture from "./IDXFuture";

test("getRandomID", async () => {
  expect(IDXFuture.getRandomID().length).toBe(32);
});
