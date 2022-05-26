import Hash from "./Hash";

test("md5", async () => {
  expect(Hash.md5("Test")).toBe("4b74ebbd6baaa4d94b5cafa8f6b21851");
});
