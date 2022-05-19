export default class PollResult {
  constructor(userID, pollID, answer, timeUpdated) {
    this.userID = userID;
    this.pollID = pollID;
    this.answer = answer;
    this.timeUpdated = timeUpdated;
  }

  get dict() {
    return {
      userID: this.userID,
      pollID: this.pollID,
      answer: this.answer,
      timeUpdated: this.timeUpdated,
    };
  }
}
