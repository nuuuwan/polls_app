import PollsAppServer from "./PollsAppServer";

test("getCacheKey", () => {
  expect(PollsAppServer.getCacheKey([1, 2, 3])).toBe("cacheKey:1:2:3");
});

test("getPollIDs", async () => {
  const pollIDs = await PollsAppServer.getPollIDs();
  expect(pollIDs.length).toBeGreaterThanOrEqual(5);
});

test("getPollExtended", async () => {
  const pollIDs = await PollsAppServer.getPollIDs();
  const pollID = pollIDs[0];
  const userID = "123456789abcdef0123456789abcdef0";
  const pollExtended1 = await PollsAppServer.getPollExtended(pollID, userID);
  const pollExtended2 = await PollsAppServer.getPollExtended(pollID, userID);
  expect(pollExtended2.totalCount).toBe(pollExtended1.totalCount);
});
