import AWSDynamoDBX from "../base/AWSDynamoDBX";
import PollResult from "./PollResult";

const TABLE_POLL_RESULT = "polls-app-poll-result";

export default class PollsAppServer {
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

  static getPollToAnswerToVotes(pollResults) {
    return pollResults.reduce(function (pollToAnswerToVotes, pollResult) {
      const pollID = pollResult.pollID;
      const answer = pollResult.answer;
      // HACK: Not unique by userID
      if (!pollToAnswerToVotes[pollID]) {
        pollToAnswerToVotes[pollID] = {};
      }
      if (!pollToAnswerToVotes[pollID][answer]) {
        pollToAnswerToVotes[pollID][answer] = 0;
      }
      pollToAnswerToVotes[pollID][answer] += 1;
      return pollToAnswerToVotes;
    }, {});
  }

  static getPollToTotalVotes(pollResults) {
    return pollResults.reduce(function (pollToTotalVotes, pollResult) {
      const pollID = pollResult.pollID;
      if (!pollToTotalVotes[pollID]) {
        pollToTotalVotes[pollID] = 0;
      }
      pollToTotalVotes[pollID] += 1;
      return pollToTotalVotes;
    }, {});
  }
}
