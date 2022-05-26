import React, { Component } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import URLContext from "./api/core/URLContext";
import GhostUserX from "./api/base/GhostUserX";
import CustomAppBar from "./components/molecules/CustomAppBar";
import PollsAppServer from "./api/core/PollsAppServer";

const STYLE = {
  padding: 3,
  maxWidth: 600,
  margin: "auto",
  marginTop: 5,
  marginBottom: 10,
};

export default class App extends Component {
  constructor(props) {
    super(props);
    const { Page } = URLContext.getContext();
    this.state = { Page, geoInfo: null };
  }

  async componentDidMount() {
    PollsAppServer.init();
    const geoInfo = await GhostUserX.getInfo();
    this.setState({ geoInfo });
  }

  onSelectPage(Page) {
    URLContext.setContext({ Page });
    this.setState({ Page });
  }

  renderInner() {
    const { Page, geoInfo } = this.state;
    if (!geoInfo) {
      return <CircularProgress />;
    }

    return (
      <Box>
        <CustomAppBar
          onSelectPage={this.onSelectPage.bind(this)}
          geoInfo={geoInfo}
          Page={Page}
        />
        <Page geoInfo={geoInfo} />
      </Box>
    );
  }

  render() {
    const theme = createTheme({
      typography: {
        fontFamily: ["PT Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Box sx={STYLE}>{this.renderInner()}</Box>
      </ThemeProvider>
    );
  }
}
