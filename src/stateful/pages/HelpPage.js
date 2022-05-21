import { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { URL_GITHUB_REPO_POLLS_APP } from "../../constants/Constants";
import SimpleLink from "../../nonstate/atoms/SimpleLink";
import FAQ from "../../nonstate/molecules/FAQ";

const FAQS = [
  {
    question: "Where can I find the code for this App?",
    answerParagraphs: [
      <>
        You can find the code for this app at
        <SimpleLink href={URL_GITHUB_REPO_POLLS_APP} />.
      </>,
      "Feel free to fork the code, report issues, or ask questions.",
    ],
  },
];

export default class HelpPage extends Component {
  render() {
    return (
      <Box>
        <Typography variant="h4">FAQs</Typography>
        {FAQS.map(function (faq, iFaq) {
          return <FAQ key={"faq-" + iFaq} faq={faq} iFaq={iFaq} />;
        })}
      </Box>
    );
  }
}
