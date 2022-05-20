import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";

import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation";
import VersionWidget from "../../nonstate/atoms/VersionWidget";
import CustomAppBar from "../../nonstate/molecules/CustomAppBar";
import PollView from "../../nonstate/molecules/PollView";

import PollsAppServer from "../../core/PollsAppServer";

const STYLE = {
  margin: 4,
  marginTop: 10,
  marginBottom: 10,
};

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iActivePoll: 0,
      polls: null,
      pollResults: null,
      pollToAnswerToVotes: null,
    };
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

  async onClickVote(pollResult) {
    await PollsAppServer.addPollResult(pollResult);
    await this.reloadData();
  }

  async componentDidMount() {
    await this.reloadData();
  }

  async reloadData() {
    const polls = await PollsAppServer.getPolls();
    const pollResults = await PollsAppServer.getPollResults();
    this.setState({
      polls,
      pollToAnswerToVotes: PollsAppServer.getPollToAnswerToVotes(pollResults),
      pollToTotalVotes: PollsAppServer.getPollToTotalVotes(pollResults),
    });
  }

  render() {
    const { polls, iActivePoll, pollToAnswerToVotes, pollToTotalVotes } =
      this.state;
    if (!polls) {
      return "Loading...";
    }

    const activePoll = polls[iActivePoll];
    const answerToVotes = pollToAnswerToVotes[activePoll.pollID]
      ? pollToAnswerToVotes[activePoll.pollID]
      : {};
    const totalVotes = pollToTotalVotes[activePoll.pollID];

    return (
      <Box sx={STYLE}>
        <CustomAppBar />

        <PollView
          poll={activePoll}
          onClickVote={this.onClickVote.bind(this)}
          answerToVotes={answerToVotes}
          totalVotes={totalVotes}
        />

        <VersionWidget />
        <CustomBottomNavigation
          onClickPrevious={this.onClickPrevious.bind(this)}
          onClickNext={this.onClickNext.bind(this)}
        />
      </Box>
    );
  }
}