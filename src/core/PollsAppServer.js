import AWSDynamoDBX from "../base/AWSDynamoDBX";
import Poll from "./Poll";
import PollResult from "./PollResult";

const TABLE_POLLS = "polls-app-polls";
const TABLE_POLL_RESULTS = "polls-app-poll-results";

export default class PollsAppServer {
  static async addPoll(poll) {
    return await AWSDynamoDBX.put(TABLE_POLLS, Poll.toDict(poll));
  }

  static async getPolls() {
    const data = await AWSDynamoDBX.scan(TABLE_POLLS);
    return data.Items.map(function (item) {
      return Poll.fromDict(item);
    });
  }

  static async addPollResult(pollResult) {
    return await AWSDynamoDBX.put(
      TABLE_POLL_RESULTS,
      PollResult.toDict(pollResult)
    );
  }

  static async getPollResultsWithDupes() {
    const data = await AWSDynamoDBX.scan(TABLE_POLL_RESULTS);
    return data.Items.map(function (item) {
      return PollResult.fromDict(item);
    });
  }

  static async getPollResults() {
    const pollResultsWithDupes = await PollsAppServer.getPollResultsWithDupes();
    const keyToPollResults = pollResultsWithDupes.reduce(function (
      keyToPollResults,
      pollResult
    ) {
      const key = pollResult.pollID + pollResult.userID;

      if (!keyToPollResults[key]) {
        keyToPollResults[key] = [];
      }
      keyToPollResults[key].push(pollResult);
      return keyToPollResults;
    },
    {});

    return Object.values(keyToPollResults).map(function (pollResultsForKey) {
      const sortedPollResultsForKey = pollResultsForKey.sort(function (
        pollResultA,
        pollResultB
      ) {
        return pollResultB.timeUpdated - pollResultA.timeUpdated;
      });
      return sortedPollResultsForKey[0];
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
