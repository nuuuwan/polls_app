import AWSDynamoDBX from "../base/AWSDynamoDBX.js";
import PollResult from "./PollResult.js";

const TABLE_POLL_RESULT = "polls-app-poll-result";

export default class PollsAppDB {
  static async addPollResult(pollResult) {
    return await AWSDynamoDBX.put(
      TABLE_POLL_RESULT,
      PollResult.toDict(pollResult)
    );
  }

  static async getPollResults() {
    const data = await AWSDynamoDBX.scan(TABLE_POLL_RESULT);
    return data.Items.map(function (item) {
      return PollResult.fromDict(item);
    });
  }
}
