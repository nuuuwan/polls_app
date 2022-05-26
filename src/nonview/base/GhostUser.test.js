import GhostUser from "./GhostUser";

test("getInfo", async () => {
  const geoInfo = await GhostUser.getInfo();
  expect(Object.keys(geoInfo)).toContain("userID");
});
