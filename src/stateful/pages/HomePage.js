import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";

import { EXAMPLE_POLL_LIST } from "../../core/Poll.js";

import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation.js";
import VersionWidget from "../../nonstate/atoms/VersionWidget.js";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar.js";
import PollView from "../../nonstate/molecules/PollView.js";

import PollsAppDB from "../../core/PollsAppDB.js";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { pollList: EXAMPLE_POLL_LIST, iActivePoll: 0 };
  }

  onClickPrevious() {
    const { pollList, iActivePoll } = this.state;
    const newIActivePoll =
      iActivePoll === 0 ? pollList.length - 1 : iActivePoll - 1;
    this.setState({ iActivePoll: newIActivePoll });
  }

  onClickNext() {
    const { pollList, iActivePoll } = this.state;
    const newIActivePoll =
      iActivePoll === pollList.length - 1 ? 0 : iActivePoll + 1;
    this.setState({ iActivePoll: newIActivePoll });
  }

  async onClickVote(pollResult) {
    await PollsAppDB.addPollResult(pollResult);
    const pollResults = await PollsAppDB.getPollResults();
    console.debug(pollResults);
  }

  render() {
    const { pollList, iActivePoll } = this.state;
    const activePoll = pollList[iActivePoll];
    return (
      <Box sx={STYLE}>
        <CustomAppBar />

        <PollView poll={activePoll} onClickVote={this.onClickVote.bind(this)} />

        <VersionWidget />
        <CustomBottomNavigation
          onClickPrevious={this.onClickPrevious.bind(this)}
          onClickNext={this.onClickNext.bind(this)}
        />
      </Box>
    );
  }
}
