import PollsAppServer from "./PollsAppServer";

test("getCacheKey", () => {
  expect(PollsAppServer.getCacheKey([1, 2, 3])).toBe("cacheKey:1:2:3");
});

test("getPollIDs", async () => {
  const pollIDs = await PollsAppServer.getPollIDs();
  expect(pollIDs.length).toBeGreaterThanOrEqual(5);
});
