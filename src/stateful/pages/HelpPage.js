import { Component } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { FAQList } from "../../constants/FAQ";
import FAQ from "../../components/molecules/FAQ";
import { HelpIcon } from "../../constants/CommonIcons.js";
import AlignCenter from "../../components/atoms/AlignCenter";

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
