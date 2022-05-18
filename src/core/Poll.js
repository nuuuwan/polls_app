export default class Poll {
  constructor(question, answerList) {
    this.question = question;
    this.answerList = answerList;
  }
}

export const EXAMPLE_POLL1 = new Poll(
  "Should we abolish the Executive Presidency?",
  ["Yes", "No"]
);
