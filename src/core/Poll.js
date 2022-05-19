export default class Poll {
  constructor(pollID, question, answerList, defaultAnswer) {
    this.pollID = pollID;
    this.question = question;
    this.answerList = answerList;
    this.defaultAnswer = defaultAnswer;
  }
}

export const EXAMPLE_POLL_LIST = [
  new Poll(
    "sl-exec-pres",
    "Should Sri Lanka abolish the Executive Presidency?",
    ["Undecided", "Yes", "No"],
    "Undecided"
  ),
  new Poll(
    "sl-20A",
    "Should Sri Lanka abolish the 20th Amendment to the Constituition?",
    ["Undecided", "Yes", "No"],
    "Undecided"
  ),

  new Poll(
    "sl-elec-2022",
    "Should Sri Lanka have General Elections in the next 3 months?",
    ["Undecided", "Yes", "No"],
    "Undecided"
  ),
];
