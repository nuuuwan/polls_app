export default class Poll {
  constructor(pollID, question, answerList) {
    this.pollID = pollID;
    this.question = question;
    this.answerList = answerList;
  }

  static toDict(poll) {
    return {
      pollID: poll.pollID,
      question: poll.question,
      answerListJSON: JSON.stringify(poll.answerList),
    };
  }

  static fromDict(d) {
    return new Poll(d.pollID, d.question, JSON.parse(d.answerListJSON));
  }
}
