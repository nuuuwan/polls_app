import Cache from "../base/Cache";
import AWSDynamoDBX from "../base/AWSDynamoDBX";
import Poll from "./Poll";
import PollExtended from "./PollExtended";
import PollResult from "./PollResult";

export default class PollsAppServer {
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

  static async getPollExtendedNoCache(pollID) {
    const d = await AWSDynamoDBX.generic({
      cmd: "get-poll-extended",
      id: pollID,
    });
    return PollExtended.fromDict(d);
  }

  static async getPollExtended(pollID) {
    return await Cache.get("getPollExtended:" + pollID, async () =>
      PollsAppServer.getPollExtendedNoCache(pollID)
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
    Cache.clear("getPollExtended:" + pollResult.pollID);
    return PollResult.fromDict(d);
  }
}
