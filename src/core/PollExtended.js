import Poll from "./Poll";

export default class PollExtended extends Poll {
  constructor(pollID, question, answerList, answerToCount) {
    super(pollID, question, answerList);
    this.answerToCount = answerToCount;
  }

  static toDict(pollExtended) {
    return {
      pollID: pollExtended.pollID,
      question: pollExtended.question,
      answerListJSON: JSON.stringify(pollExtended.answerList),
      answerToCount: pollExtended.answerToCount,
    };
  }

  static fromDict(d) {
    return new PollExtended(
      d.pollID,
      d.question,
      JSON.parse(d.answerListJSON),
      d.answerToCount
    );
  }
}
