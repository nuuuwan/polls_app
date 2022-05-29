import ID from "../../nonview/base/ID";

export const MIN_QUESTION_LENGTH = 10;
export const MIN_ANSWER_LIST_LENGTH = 2;

export const DEFAULT_QUESTION = "";
export const DEFAULT_ANSWER_LIST = [];
export const DEFAULT_VISIBILITY = "unlisted";

export const ANSWER_NONE = "";

export default class Poll {
  constructor(pollID, question, answerList, visibility) {
    this.pollID = pollID;
    this.question = question;
    this.answerList = answerList;
    this.visibility = visibility;
  }

  get isQuestionValid() {
    return (
      this.question.length >= MIN_QUESTION_LENGTH &&
      this.question.trim().slice(-1) === "?"
    );
  }

  get isAnswerListValid() {
    return this.answerList.length >= MIN_ANSWER_LIST_LENGTH;
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

  static constructEmptyPoll() {
    return new Poll(
      ID.getRandomID(),
      DEFAULT_QUESTION,
      DEFAULT_ANSWER_LIST,
      DEFAULT_VISIBILITY
    );
  }
}
