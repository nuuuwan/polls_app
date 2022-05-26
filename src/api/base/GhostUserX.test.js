import GhostUserX from "./GhostUserX";

test("getInfo", async () => {
  const geoInfo = await GhostUserX.getInfo();
  expect(Object.keys(geoInfo)).toContain("userID");
});
