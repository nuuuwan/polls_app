export default class Poll {
  constructor(pollID, question, answerList, visibility) {
    this.pollID = pollID;
    this.question = question;
    this.answerList = answerList;
    this.visibility = visibility;
  }

  static toDict(poll) {
    return {
      pollID: poll.pollID,
      question: poll.question,
      answerListJSON: JSON.stringify(poll.answerList),
      visibility: poll.visibility,
    };
  }

  static fromDict(d) {
    return new Poll(
      d.pollID,
      d.question,
      JSON.parse(d.answerListJSON),
      d.visibility
    );
  }
}
