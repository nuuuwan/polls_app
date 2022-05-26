import HashX from "./HashX";

test("md5", async () => {
  expect(HashX.md5("Test")).toBe("4b74ebbd6baaa4d94b5cafa8f6b21851");
});
