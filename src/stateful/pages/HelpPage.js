import { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { URL_GITHUB_REPO_POLLS_APP } from "../../constants/Constants";
import { FAQList } from "../../constants/FAQ";
import SimpleLink from "../../nonstate/atoms/SimpleLink";
import FAQ from "../../nonstate/molecules/FAQ";
import { HelpIcon } from "../../constants/CommonIcons.js";
import AlignCenter from "../../nonstate/atoms/AlignCenter";

export default class HelpPage extends Component {
  render() {
    return (
      <Box>
        <AlignCenter>
          <HelpIcon />
          <Typography variant="h4">FAQs</Typography>
        </AlignCenter>
        {FAQList.map(function (faq, iFaq) {
          return <FAQ key={"faq-" + iFaq} faq={faq} iFaq={iFaq} />;
        })}
      </Box>
    );
  }
}
