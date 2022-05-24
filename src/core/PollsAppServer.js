import Cache from "../base/Cache";
import AWSDynamoDBX from "../base/AWSDynamoDBX";
import Poll from "./Poll";
import PollExtended from "./PollExtended";
import PollResult from "./PollResult";

export default class PollsAppServer {
  // General
  static getCacheKey(words) {
    return "cacheKey:" + words.join(":");
  }

  // Polls
  static async getPollIDsNoCache() {
    const data = await AWSDynamoDBX.generic({
      cmd: "multiget-ids-polls",
    });
    return data.map((d) => d["pollID"]);
  }

  static async getPollIDs() {
    return await Cache.get("getPollIDs", PollsAppServer.getPollIDsNoCache);
  }

  static async getPollExtendedNoCache(pollID, userID) {
    const d = await AWSDynamoDBX.generic({
      cmd: "get-poll-extended",
      d: {
        pollID,
        userID,
      },
    });
    return PollExtended.fromDict(d);
  }

  static getPollExtendedCacheKey(pollID, userID) {
    return PollsAppServer.getCacheKey(["getPollExtended", pollID, userID]);
  }

  static async getPollExtended(pollID, userID) {
    return await Cache.get(
      PollsAppServer.getPollExtendedCacheKey(pollID, userID),
      async () => PollsAppServer.getPollExtendedNoCache(pollID, userID)
    );
  }

  static async addPoll(poll) {
    let pollIDs = await PollsAppServer.getPollIDs();
    const d = await AWSDynamoDBX.generic({
      cmd: "put-poll",
      d: Poll.toDict(poll),
    });
    pollIDs.push(poll.pollID);
    Cache.set("getPollIDs", pollIDs);
    return Poll.fromDict(d);
  }

  // Poll Results
  static async addPollResult(pollResult) {
    const d = await AWSDynamoDBX.generic({
      cmd: "put-poll-result",
      d: PollResult.toDict(pollResult),
    });
    Cache.clear(
      PollsAppServer.getPollExtendedCacheKey(
        pollResult.pollID,
        pollResult.userID
      )
    );
    return PollResult.fromDict(d);
  }
}
