import { Component } from "react";
import * as React from "react";

import { MathX, TimeX } from "@nuuuwan/utils-js-dev";

import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../nonview/core/PollsAppServer";

import PollView from "../../view/organisms/PollView";
import PollBottomNavigation from "../../view/molecules/PollBottomNavigation";
import NewPollDrawer from "../../view/organisms/NewPollDrawer";
import URLContext from "../../nonview/core/URLContext";
import AudioX from "../../nonview/core/AudioX";
import PollDirectory from "../../view/organisms/PollDirectory";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      pollID: undefined,
      showNewPollDrawer: false,
      isSnackbarOpen: false,
      lastUpdated: TimeX.getUnixTime(),
    };
  }

  async reloadData() {
    let { pollID } = URLContext.getContext();
    const pollIDs = await PollsAppServer.getPollIDs();
    const lastUpdated = TimeX.getUnixTime();

    if (!pollID) {
      pollID = pollIDs[0];
    }

    this.setState({ pollIDs, pollID, showNewPollDrawer: false, lastUpdated });
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

  render() {
    const { pollIDs, pollID, showNewPollDrawer, isSnackbarOpen, lastUpdated } =
      this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    URLContext.setContext({ Page: PollPage, pollID });
    const messageSnackbar = <div>Copied Poll URL to Clipboard.</div>;

    return (
      <div key={"poll-page-" + lastUpdated}>
        <Box sx={{ marginBotton: 1, maxWidth: "100%" }}>
          <PollView
            key={"poll-" + pollID}
            pollID={pollID}
            setLastUpdated={this.setLastUpdated.bind(this)}
          />
          <PollDirectory
            pollIDs={pollIDs}
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
