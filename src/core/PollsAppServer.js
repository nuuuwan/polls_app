import AWSDynamoDBX from "../base/AWSDynamoDBX";
import Poll from "./Poll";
import PollExtended from "./PollExtended";
import PollResult from "./PollResult";

const CLASS_NAME_POLL = "poll";
const CLASS_NAME_POLL_RESULT = "poll-result";

export default class PollsAppServer {
  static async addPoll(poll) {
    return await AWSDynamoDBX.put(CLASS_NAME_POLL, Poll.toDict(poll));
  }

  static async getPolls() {
    const data = await AWSDynamoDBX.multiGet(CLASS_NAME_POLL);
    return data.map(function (d) {
      return Poll.fromDict(d);
    });
  }

  static async getPollIDs() {
    const data = await AWSDynamoDBX.generic({
      cmd: "multiget-ids-polls",
    });
    return data.map((d) => d["pollID"]);
  }

  static async getPoll(pollID) {
    const d = await AWSDynamoDBX.get(CLASS_NAME_POLL, pollID);
    return Poll.fromDict(d);
  }

  static async getPollExtended(pollID) {
    const d = await AWSDynamoDBX.generic({
      cmd: "get-poll-extended",
      id: pollID,
    });
    return PollExtended.fromDict(d);
  }

  static async addPollResult(pollResult) {
    return await AWSDynamoDBX.put(
      CLASS_NAME_POLL_RESULT,
      PollResult.toDict(pollResult)
    );
  }

  static async getPollResultsWithDupes() {
    const data = await AWSDynamoDBX.multiGet(CLASS_NAME_POLL_RESULT);
    return data.map(function (d) {
      return PollResult.fromDict(d);
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
