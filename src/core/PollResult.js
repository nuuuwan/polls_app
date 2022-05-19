export default class PollResult {
  constructor(userID, pollID, value, timeUpdated) {
    this.userID = userID;
    this.pollID = pollID;
    this.value = value;
    this.timeUpdated = timeUpdated;
  }

  get dict() {
    return {
      userID: this.userID,
      pollID: this.pollID,
      pollResultValue: this.pollResultValue,
      timeUpdated: this.timeUpdated,
    };
  }
}
