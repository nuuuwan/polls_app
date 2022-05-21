import { Component } from "react";
import * as React from "react";

import PollView from "../../nonstate/molecules/PollView";

import PollsAppServer from "../../core/PollsAppServer";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iActivePoll: 0,
      polls: null,
      pollResults: null,
      pollToAnswerToVotes: null,
    };
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
      <PollView
        poll={activePoll}
        onClickVote={this.onClickVote.bind(this)}
        answerToVotes={answerToVotes}
        totalVotes={totalVotes}
      />
    );
  }
}
