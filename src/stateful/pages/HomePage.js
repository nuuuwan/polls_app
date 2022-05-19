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
    this.state = {
      pollList: EXAMPLE_POLL_LIST,
      iActivePoll: 0,
      pollResults: null,
      pollToAnswerToVotes: null,
    };
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
    await this.updatePollResults();
  }

  async componentDidMount() {
    await this.updatePollResults();
  }

  async updatePollResults() {
    const pollResults = await PollsAppDB.getPollResults();
    const pollToAnswerToVotes = pollResults.reduce(function (
      pollToAnswerToVotes,
      pollResult
    ) {
      const pollID = pollResult.pollID;
      const answer = pollResult.answer;
      // HACK: Not unique by userID
      if (!pollToAnswerToVotes[pollID]) {
        pollToAnswerToVotes[pollID] = {};
      }
      if (!pollToAnswerToVotes[pollID][answer]) {
        pollToAnswerToVotes[pollID][answer] = 0;
      }
      pollToAnswerToVotes[pollID][answer] += 1;
      return pollToAnswerToVotes;
    },
    {});
    this.setState({ pollResults, pollToAnswerToVotes });
  }

  render() {
    const { pollList, iActivePoll, pollResults, pollToAnswerToVotes } =
      this.state;
    if (!pollResults) {
      return "Loading...";
    }

    const activePoll = pollList[iActivePoll];
    const answerToVotes = pollToAnswerToVotes[activePoll.pollID]
      ? pollToAnswerToVotes[activePoll.pollID]
      : {};
    const totalVotes = Object.entries(answerToVotes).reduce(function (
      totalVotes,
      [answer, votes]
    ) {
      return totalVotes + votes;
    },
    0);

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
