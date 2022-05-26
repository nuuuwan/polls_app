import { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { TimeX } from "@nuuuwan/utils-js-dev";

import PollResult from "../../nonview/core/PollResult";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import GhostUser from "../../nonview/base/GhostUser";
import AudioX from "../../nonview/core/AudioX";

import PollViewMolecule from "../../view/molecules/PollViewMolecule";

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: undefined,
      hasSubmittedVote: false,
    };
  }

  async componentDidMount() {
    const { pollID } = this.props;
    const geoInfo = await GhostUser.getInfo();
    const userID = geoInfo.userID;
    const pollExtended = await PollsAppServer.getPollExtended(pollID, userID);
    this.setState({ pollExtended, selectedAnswer: pollExtended.userAnswer });
  }

  async onClickVote(pollExtended) {
    const { selectedAnswer } = this.state;
    const { reloadData } = this.props;

    const geoInfo = await await GhostUser.getInfo();
    const userID = geoInfo.infoHash;

    const pollResult = new PollResult(
      pollExtended.pollID,
      userID,
      selectedAnswer,
      TimeX.getUnixTime(),
      geoInfo
    );
    await PollsAppServer.addPollResult(pollResult);
    await AudioX.playVote();
    await reloadData();
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
    return (
      <PollViewMolecule
        pollExtended={pollExtended}
        selectedAnswer={selectedAnswer}
        setSelectedAnswer={this.setSelectedAnswer.bind(this)}
        hasSubmittedVote={hasSubmittedVote}
        onClickVote={this.onClickVote.bind(this)}
      />
    );
  }
}
