export const FAQList = [
  {
    question: "Where can I find the code for this App?",
    answerParagraphs: [
      <>
        {"You can find the code on "}
        <SimpleLink href={URL_GITHUB_REPO_POLLS_APP} label="GitHub" />.
      </>,
      "Feel free to fork the code, report issues, or ask questions.",
    ],
  },
  {
    question: "How many times can I vote in a single poll?",
    answerParagraphs: [
      "You can vote any number of times.",
      "Your most recent vote will be counted",
    ],
  },
];
