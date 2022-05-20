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
    "534d-cdad-c48e-3d14-7a8a",
    "Should Sri Lanka abolish the Executive Presidency?",
    ["Yes", "No", "Undecided"],
    "Undecided"
  ),
  new Poll(
    "ea35-d38c-1ce9-a1d2-5563",
    "Should Sri Lanka abolish the 20th Amendment to the Constituition?",
    ["Yes", "No", "Undecided"],
    "Undecided"
  ),

  new Poll(
    "e059-2040-f2b8-a613-998a",
    "Should Sri Lanka have General Elections in the next 3 months?",
    ["Yes", "No", "Undecided"],
    "Undecided"
  ),

  new Poll(
    "e67c-1165-2e00-71a6-9c04",
    "What should you put in this new poll?",
    ["Yes", "No", "Undecided"],
    "Undecided"
  ),

  new Poll(
    "caa7-1eaf-37fc-bd24-3fa6",
    "What should you put in this one answer poll poll?",
    ["Yes", "No", "Undecided"],
    "Undecided"
  ),
];
