import Cache from "../base/Cache";
import AWSDynamoDB from "../base/AWSDynamoDB";
import Poll from "./Poll";
import PollExtended from "./PollExtended";
import PollResult from "./PollResult";
import { CACHE_KEY_GHOST_USER } from "../base/GhostUser";

export default class PollsAppServer {
  // General
  static init() {
    const ghostUser = localStorage.getItem(CACHE_KEY_GHOST_USER);
    localStorage.clear();
    if (ghostUser) {
      localStorage.setItem(CACHE_KEY_GHOST_USER, ghostUser);
    }
  }

  static getCacheKey(words) {
    return "cacheKey:" + words.join(":");
  }

  // Polls
  static async getPollIDsNoCache() {
    const data = await AWSDynamoDB.generic({
      cmd: "multiget-ids-polls",
    });
    return data.map((d) => d["pollID"]);
  }

  static async getPollIDs() {
    return await Cache.get("getPollIDs", PollsAppServer.getPollIDsNoCache);
  }

  static async getPollExtendedNoCache(pollID, userID) {
    const d = await AWSDynamoDB.generic({
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
    const d = await AWSDynamoDB.generic({
      cmd: "put-poll",
      d: Poll.toDict(poll),
    });
    if (poll.visibility === "public") {
      pollIDs.push(poll.pollID);
      Cache.set("getPollIDs", pollIDs);
    }
    return Poll.fromDict(d);
  }

  // TODO: Should be in server?

  static async getPollExtendedListForUser(userID) {
    const pollIDs = await PollsAppServer.getPollIDs();
    return await Promise.all(
      pollIDs.map(async function (pollID) {
        return await PollsAppServer.getPollExtended(pollID, userID);
      })
    );
  }

  static async getPollExtendedIdxForUser(userID) {
    const pollExtendedList = await PollsAppServer.getPollExtendedListForUser(
      userID
    );
    return pollExtendedList.reduce(function (pollExtendedIdx, pollExtended) {
      pollExtendedIdx[pollExtended.pollID] = pollExtended;
      return pollExtendedIdx;
    }, {});
  }

  // Poll Results
  static async addPollResult(pollResult) {
    const d = await AWSDynamoDB.generic({
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
