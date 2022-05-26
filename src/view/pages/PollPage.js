import { Component } from "react";
import * as React from "react";

import { TimeX } from "@nuuuwan/utils-js-dev";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../nonview/core/PollsAppServer";

import GhostUser from "../../nonview/base/GhostUser";
import PollView from "../../view/molecules/PollView";
import PollBottomNavigation from "../../view/organisms/PollBottomNavigation";
import URLContext from "../../nonview/core/URLContext";
import AudioX from "../../nonview/core/AudioX";
import PollDirectory from "../../view/molecules/PollDirectory";
import PollResult from "../../nonview/core/PollResult";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      pollID: undefined,
      pollExtendedList: undefined,
      showNewPollDrawer: false,
      isSnackbarOpen: false,
      lastUpdated: TimeX.getUnixTime(),
      selectedAnswer: undefined,
      hasSubmittedVote: false,
    };
  }

  async reloadData() {
    let { pollID } = URLContext.getContext();
    const pollIDs = await PollsAppServer.getPollIDs();
    const lastUpdated = TimeX.getUnixTime();
    const geoInfo = await GhostUser.getInfo();

    if (!pollID) {
      pollID = pollIDs[0];
    }

    const userID = geoInfo.userID;
    const pollExtendedList = await Promise.all(
      pollIDs.map(async function (pollID) {
        return await PollsAppServer.getPollExtended(pollID, userID);
      })
    );

    const pollExtendedIdx = pollExtendedList.reduce(function (
      pollExtendedIdx,
      pollExtended
    ) {
      pollExtendedIdx[pollExtended.pollID] = pollExtended;
      return pollExtendedIdx;
    },
    {});

    this.setState({
      pollIDs,
      pollID,
      pollExtendedIdx,
      showNewPollDrawer: false,
      lastUpdated,
    });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  setLastUpdated() {
    const lastUpdated = TimeX.getUnixTime();
    this.setState({ lastUpdated });
  }

  async onClickVote(pollExtended) {
    const { selectedAnswer } = this.state;
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
    await this.reloadData();
  }

  async onSelectPoll(pollID) {
    URLContext.setContext({ Page: PollPage, pollID });
    await this.reloadData();
    await AudioX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async setSelectedAnswer(selectedAnswer) {
    await AudioX.playClick();
    this.setState({ selectedAnswer, hasSubmittedVote: false });
  }

  render() {
    const {
      pollIDs,
      pollID,
      pollExtendedIdx,
      lastUpdated,
      selectedAnswer,
      hasSubmittedVote,
    } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }
    const pollExtended = pollExtendedIdx[pollID];

    URLContext.setContext({ Page: PollPage, pollID });

    return (
      <div key={"poll-page-" + lastUpdated}>
        <Box sx={{ marginBotton: 1, maxWidth: "100%" }}>
          <PollView
            key={"poll-" + pollID}
            pollExtended={pollExtended}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={this.setSelectedAnswer.bind(this)}
            hasSubmittedVote={hasSubmittedVote}
            onClickVote={this.onClickVote.bind(this)}
          />
          <PollDirectory
            pollExtendedIdx={pollExtendedIdx}
            onSelectPoll={this.onSelectPoll.bind(this)}
          />
        </Box>

        <PollBottomNavigation
          pollExtended={pollExtended}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </div>
    );
  }
}
