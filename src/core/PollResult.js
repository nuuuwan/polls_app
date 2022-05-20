import HashX from "../base/HashX";

export default class PollResult {
  constructor(pollID, userID, answer, timeUpdated, geoInfo) {
    this.pollID = pollID;
    this.userID = userID;
    this.answer = answer;
    this.timeUpdated = timeUpdated;
    this.geoInfo = geoInfo;
  }

  get pollResultID() {
    return HashX.md5([
      this.pollID,
      this.userID,
      this.timeUpdated,
      this.geoInfo,
    ]);
  }

  static toDict(pollResult) {
    return {
      pollResultID: pollResult.pollResultID,
      pollID: pollResult.pollID,
      userID: pollResult.userID,
      answer: pollResult.answer,
      timeUpdated: pollResult.timeUpdated,
      geoInfo: pollResult.geoInfo,
    };
  }

  static fromDict(d) {
    return new PollResult(
      d.pollID,
      d.userID,
      d.answer,
      d.timeUpdated,
      d.geoInfo
    );
  }
}
