import { Component } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FAQList } from "../../nonview/constants/FAQ";

import { HelpIcon } from "../../view/_constants/CommonIcons";
import AlignCenter from "../../view/atoms/AlignCenter";
import FAQ from "../../view/molecules/FAQ";

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
