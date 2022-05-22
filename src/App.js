import React, { Component } from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GhostUserX from "./base/GhostUserX";
import PollPage from "./stateful/pages/PollPage";
import VersionWidget from "./nonstate/atoms/VersionWidget";
import CustomAppBar from "./nonstate/molecules/CustomAppBar";

const STYLE = {
  margin: 2,
  padding: 1,
  marginTop: 10,
  marginBottom: 10,
  maxWidth: 400,
};

const DEFAULT_PAGE = PollPage;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Page: DEFAULT_PAGE, geoInfo: null };
  }

  async componentDidMount() {
    this.setState({
      geoInfo: await GhostUserX.getInfo(),
    });
  }

  onSelectPage(Page) {
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
        <Box sx={STYLE}>
          {this.renderInner()}
          <VersionWidget />
        </Box>
      </ThemeProvider>
    );
  }
}
