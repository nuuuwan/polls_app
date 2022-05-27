import Poll from "./Poll";

export default class PollExtended extends Poll {
  constructor(
    pollID,
    question,
    answerList,
    visibility,
    answerToCount,
    userAnswer
  ) {
    super(pollID, question, answerList, visibility);
    this.answerToCount = answerToCount;
    this.userAnswer = userAnswer;
  }

  get totalCount() {
    return Object.values(this.answerToCount).reduce(function (
      totalCount,
      count
    ) {
      return totalCount + count;
    },
    0);
  }

  static toDict(pollExtended) {
    return {
      pollID: pollExtended.pollID,
      question: pollExtended.question,
      answerListJSON: JSON.stringify(pollExtended.answerList),
      visibility: pollExtended.visibility,
      answerToCount: pollExtended.answerToCount,
      userAnswer: pollExtended.userAnswer,
    };
  }

  static fromDict(d) {
    return new PollExtended(
      d.pollID,
      d.question,
      JSON.parse(d.answerListJSON),
      d.visibility,
      d.answerToCount,
      d.userAnswer
    );
  }
}
