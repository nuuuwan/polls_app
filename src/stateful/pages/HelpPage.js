import { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { URL_GITHUB_REPO_POLLS_APP } from "../../constants/Constants";
import SimpleLink from "../../nonstate/atoms/SimpleLink";
import FAQ from "../../nonstate/molecules/FAQ";
import { HelpIcon } from "../../constants/Constants.js";
import AlignCenter from "../../nonstate/atoms/AlignCenter";

const FAQS = [
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

export default class HelpPage extends Component {
  render() {
    return (
      <Box>
        <AlignCenter>
          <HelpIcon />
          <Typography variant="h4">FAQs</Typography>
        </AlignCenter>
        {FAQS.map(function (faq, iFaq) {
          return <FAQ key={"faq-" + iFaq} faq={faq} iFaq={iFaq} />;
        })}
      </Box>
    );
  }
}
