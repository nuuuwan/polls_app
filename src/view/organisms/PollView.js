import { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import { TimeX } from "@nuuuwan/utils-js-dev";

import GhostUser from "../../nonview/base/GhostUser";
import AudioX from "../../nonview/core/AudioX";
import URLContext from "../../nonview/core/URLContext";
import PollResult from "../../nonview/core/PollResult";
import PollsAppServer from "../../nonview/core/PollsAppServer";

import PollViewMolecule from "../../view/molecules/PollViewMolecule";
import PollPage from "../../view/pages/PollPage";

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: undefined,
      hasSubmittedVote: false,
    };
  }

  async refresh(pollID, hasSubmittedVote) {
    const userID = await GhostUser.getUserID();
    const pollExtended = await PollsAppServer.getPollExtended(pollID, userID);

    URLContext.setContext({ Page: PollPage, pollID });
    this.setState({
      pollExtended,
      selectedAnswer: pollExtended.userAnswer,
      hasSubmittedVote,
    });
  }

  async componentDidMount() {
    let { pollID } = URLContext.getContext();
    if (!pollID) {
      const pollIDs = await PollsAppServer.getPollIDs();
      pollID = pollIDs[0];
    }
    await this.refresh(pollID, false);
  }

  async onClickVote() {
    const { pollExtended, selectedAnswer } = this.state;

    const geoInfo = await GhostUser.getInfo();

    const pollResult = new PollResult(
      pollExtended.pollID,
      geoInfo.userID,
      selectedAnswer,
      TimeX.getUnixTime(),
      geoInfo
    );
    await PollsAppServer.addPollResult(pollResult);
    await AudioX.playVote();
    await this.refresh(pollExtended.pollID, true);
  }

  async setSelectedAnswer(selectedAnswer) {
    await AudioX.playClick();
    this.setState({ selectedAnswer, hasSubmittedVote: false });
  }

  render() {
    const { pollExtended, selectedAnswer, hasSubmittedVote } = this.state;
    if (!pollExtended) {
      return <CircularProgress />;
    }
    const key =
      "poll-view-molecule-" +
      pollExtended.userID +
      "-" +
      pollExtended.answerToCount;
    return (
      <PollViewMolecule
        key={key}
        pollExtended={pollExtended}
        selectedAnswer={selectedAnswer}
        hasSubmittedVote={hasSubmittedVote}
        setSelectedAnswer={this.setSelectedAnswer.bind(this)}
        onClickVote={this.onClickVote.bind(this)}
      />
    );
  }
}
