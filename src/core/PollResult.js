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

  get dict() {
    return {
      pollResultID: this.pollResultID,
      pollID: this.pollID,
      userID: this.userID,
      answer: this.answer,
      timeUpdated: this.timeUpdated,
    };
  }
}
