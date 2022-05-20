export default class Poll {
  constructor(pollID, question, answerList) {
    this.pollID = pollID;
    this.question = question;
    this.answerList = answerList;
  }
}

export const EXAMPLE_POLL_LIST = [
  new Poll(
    "426e5664e22e9524c968715f30f6e325",
    "Should Sri Lanka abolish the Executive Presidency?",
    ["Yes", "No", "Undecided"]
  ),
  new Poll(
    "c7afc6cb3a5f62e158147de8b1aef6a0",
    "Should Sri Lanka abolish the 20th Amendment to the Constituition?",
    ["Yes", "No", "Undecided"]
  ),

  new Poll(
    "61006fc080178e15c2f89483da9b1934",
    "Should Sri Lanka have General Elections in the next 3 months?",
    ["Yes", "No", "Undecided"]
  ),

  new Poll(
    "f3d94e50567ce6d3aefe33ea50413931",
    "What should you put in this new poll?",
    ["Yes", "No", "Undecided"]
  ),

  new Poll(
    "33157ba8ed69d87c659c761c80caaf6b",
    "What should you put in this one answer poll poll?",
    ["Yes", "No", "Undecided"]
  ),
];
