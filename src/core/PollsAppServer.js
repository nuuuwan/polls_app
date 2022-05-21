import AWSDynamoDBX from "../base/AWSDynamoDBX";
import Poll from "./Poll";
import PollExtended from "./PollExtended";
import PollResult from "./PollResult";

export default class PollsAppServer {
  // Polls
  static async getPollIDs() {
    const data = await AWSDynamoDBX.generic({
      cmd: "multiget-ids-polls",
    });
    return data.map((d) => d["pollID"]);
  }

  static async getPollExtended(pollID) {
    const d = await AWSDynamoDBX.generic({
      cmd: "get-poll-extended",
      id: pollID,
    });
    return PollExtended.fromDict(d);
  }

  // Poll Results
  static async addPollResult(pollResult) {
    const d = await AWSDynamoDBX.generic({
      cmd: "put-poll-result",
      d: PollResult.toDict(pollResult),
    });
    return PollResult.fromDict(d);
  }
}
