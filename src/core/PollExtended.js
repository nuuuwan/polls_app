import Poll from "./Poll";

export default class PollExtended extends Poll {
  constructor(pollID, question, answerList, answerToCount, userAnswer) {
    super(pollID, question, answerList);
    this.answerToCount = answerToCount;
    this.userAnswer = userAnswer;
  }

  static toDict(pollExtended) {
    return {
      pollID: pollExtended.pollID,
      question: pollExtended.question,
      answerListJSON: JSON.stringify(pollExtended.answerList),
      answerToCount: pollExtended.answerToCount,
      userAnswer: pollExtended.userAnswer,
    };
  }

  static fromDict(d) {
    return new PollExtended(
      d.pollID,
      d.question,
      JSON.parse(d.answerListJSON),
      d.answerToCount,
      d.userAnswer
    );
  }
}
