import { Component } from "react";
import * as React from "react";

import { MathX, TimeX } from "@nuuuwan/utils-js-dev";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../nonview/core/PollsAppServer";

import GhostUser from "../../nonview/base/GhostUser";
import PollView from "../../view/molecules/PollView";
import PollBottomNavigation from "../../view/molecules/PollBottomNavigation";
import NewPollDrawer from "../../view/organisms/AddNewPollDrawer";
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

  async onClickNewPoll() {
    this.setState({ showNewPollDrawer: true });
    await AudioX.playClick();
  }

  async onClickRandomPoll() {
    const { pollIDs, pollID } = this.state;
    let newPollID = pollID;
    while (newPollID === pollID) {
      newPollID = pollIDs[MathX.randomInt(0, pollIDs.length)];
    }
    this.setState({ pollID: newPollID });
    await AudioX.playClick();
  }

  async onClickCopyPoll() {
    navigator.clipboard.writeText(URLContext.getURL());
    this.setState({ isSnackbarOpen: true });
    await AudioX.playClick();
  }

  async onClickTweet() {
    const tweetText = [
      "🗳 Checkout this #PollsAppLK poll",
      "",
      "#SriLanka",
      URLContext.getURL(),
    ].join("\n");
    const twitterURL =
      "http://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(twitterURL, "_blank");
    await AudioX.playClick();
  }

  async onClickVote(pollExtended) {
    const {selectedAnswer} = this.state;
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


  onCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  async onSelectPoll(pollID) {
    URLContext.setContext({ Page: PollPage, pollID });
    await this.reloadData();
    await AudioX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async onCloseNewPollDrawer(pollID) {
    this.setState({
      showNewPollDrawer: false,
    });
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
      showNewPollDrawer,
      isSnackbarOpen,
      lastUpdated,
      selectedAnswer,
      hasSubmittedVote,
    } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }
    const pollExtended = pollExtendedIdx[pollID];

    URLContext.setContext({ Page: PollPage, pollID });
    const messageSnackbar = <div>Copied Poll URL to Clipboard.</div>;

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

        <NewPollDrawer
          isOpen={showNewPollDrawer}
          onClose={this.onCloseNewPollDrawer.bind(this)}
          onAddNewPoll={this.onSelectPoll.bind(this)}
        />
        <PollBottomNavigation
          onClickNewPoll={this.onClickNewPoll.bind(this)}
          onClickRandomPoll={this.onClickRandomPoll.bind(this)}
          onClickCopyPoll={this.onClickCopyPoll.bind(this)}
          onClickTweet={this.onClickTweet.bind(this)}
        />
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={1000}
          onClose={this.onCloseSnackbar.bind(this)}
          message={messageSnackbar}
        />
      </div>
    );
  }
}
