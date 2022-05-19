export default class PollResult {
  constructor(pollID, userID, answer, timeUpdated) {
    this.pollID = pollID;
    this.userID = userID;
    this.answer = answer;
    this.timeUpdated = timeUpdated;
  }

  get pollResultID() {
    return [this.pollID, this.userID, this.timeUpdated].join("-");
  }

  static toDict(pollResult) {
    return {
      pollResultID: pollResult.pollResultID,
      pollID: pollResult.pollID,
      userID: pollResult.userID,
      answer: pollResult.answer,
      timeUpdated: pollResult.timeUpdated,
    };
  }

  static fromDict(d) {
    return new PollResult(d.pollID, d.userID, d.answer, d.timeUpdated);
  }
}
