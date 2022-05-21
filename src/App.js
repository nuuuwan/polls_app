import React, { Component } from "react";
import Box from "@mui/material/Box";
import UserPage from "./stateful/pages/UserPage";
// import PollPage from "./stateful/pages/PollPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import CustomBottomNavigation from "./nonstate/molecules/CustomBottomNavigation";
import VersionWidget from "./nonstate/atoms/VersionWidget";
import CustomAppBar from "./nonstate/molecules/CustomAppBar";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

// const DEFAULT_PAGE = PollPage;
const DEFAULT_PAGE = UserPage;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Page: DEFAULT_PAGE };
  }

  onSelectPage(Page) {
    this.setState({ Page });
  }

  onClickPrevious() {
    const { polls, iActivePoll } = this.state;
    const newIActivePoll =
      iActivePoll === 0 ? polls.length - 1 : iActivePoll - 1;
    this.setState({ iActivePoll: newIActivePoll });
  }

  onClickNext() {
    const { polls, iActivePoll } = this.state;
    const newIActivePoll =
      iActivePoll === polls.length - 1 ? 0 : iActivePoll + 1;
    this.setState({ iActivePoll: newIActivePoll });
  }

  render() {
    const { Page } = this.state;
    const theme = createTheme({
      typography: {
        fontFamily: ["PT Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Box sx={STYLE}>
          <CustomAppBar onSelectPage={this.onSelectPage.bind(this)} />

          <Page />

          <VersionWidget />
          <CustomBottomNavigation
            onClickPrevious={this.onClickPrevious.bind(this)}
            onClickNext={this.onClickNext.bind(this)}
          />
        </Box>
      </ThemeProvider>
    );
  }
}
