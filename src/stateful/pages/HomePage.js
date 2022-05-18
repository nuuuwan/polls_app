import { Component } from "react";
import * as React from "react";
// import ReactGA from "react-ga";

import Box from "@mui/material/Box";

import { EXAMPLE_POLL1 } from "../../core/Poll.js";

import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";
import PollView from "../../nonstate/molecules/PollView.js";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { activePoll: EXAMPLE_POLL1 };
  }
  componentDidMount() {
    // ReactGA.pageview(window.location.pathname);
  }

  onClickBack() {
    window.history.back();
    window.location.reload(true);
  }

  render() {
    const { activePoll } = this.state;
    return (
      <Box sx={STYLE}>
        <CustomAppBar />

        <PollView poll={activePoll} />

        <VersionWidget />
        <CustomBottomNavigation onClickBack={this.onClickBack.bind(this)} />
      </Box>
    );
  }
}
