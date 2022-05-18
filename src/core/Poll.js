export default class Poll {
  constructor(question, answerValueToLabel) {
    this.question = question;
    this.answerValueToLabel = answerValueToLabel;
  }
}

export const EXAMPLE_POLL_LIST = [
  new Poll("Should Sri Lanka abolish the Executive Presidency?", {
    yes: "Yes",
    no: "No",
  }),
  new Poll(
    "Should Sri Lanka abolish the 20th Amendment to the Constituition?",
    {
      yes: "Yes",
      no: "No",
    }
  ),
  new Poll("Should Sri Lanka have General Elections in the next 3 months?", {
    yes: "Yes",
    no: "No",
  }),
];
