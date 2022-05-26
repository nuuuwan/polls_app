import ID from "./ID";

test("getRandomID", async () => {
  expect(ID.getRandomID().length).toBe(32);
});
