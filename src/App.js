import React, { Component } from "react";
import Box from "@mui/material/Box";
import PollPage from "./stateful/pages/PollPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import GeoLocationDBX from "./base/GeoLocationDBX";
import VersionWidget from "./nonstate/atoms/VersionWidget";
import CustomAppBar from "./nonstate/molecules/CustomAppBar";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
  maxWidth: 400,
  margin: "auto",
};

const DEFAULT_PAGE = PollPage;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { Page: DEFAULT_PAGE, geoInfo: null };
  }

  async componentDidMount() {
    this.setState({
      geoInfo: await GeoLocationDBX.getInfo(),
    });
  }

  onSelectPage(Page) {
    this.setState({ Page });
  }

  render() {
    const { Page, geoInfo } = this.state;
    if (!geoInfo) {
      return "Loading...";
    }
    const theme = createTheme({
      typography: {
        fontFamily: ["PT Sans", "sans-serif"].join(","),
        fontSize: 14,
      },
    });

    return (
      <ThemeProvider theme={theme}>
        <Box sx={STYLE}>
          <CustomAppBar
            onSelectPage={this.onSelectPage.bind(this)}
            geoInfo={geoInfo}
          />

          <Page geoInfo={geoInfo} />

          <VersionWidget />
        </Box>
      </ThemeProvider>
    );
  }
}
