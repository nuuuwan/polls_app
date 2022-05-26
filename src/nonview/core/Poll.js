export const MIN_QUESTION_LENGTH = 10;
export const MIN_ANSWER_LIST_LENGTH = 2;

export const DEFAULT_QUESTION = "";
export const DEFAULT_ANSWER_LIST = [];
export const DEFAULT_VISIBILITY = "unlisted";

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

  static isQuestionValid(question) {
    return (
      question.length >= MIN_QUESTION_LENGTH &&
      question.trim().slice(-1) === "?"
    );
  }

  static isAnswerListValid(answerList) {
    return answerList.length >= MIN_ANSWER_LIST_LENGTH;
  }
}
