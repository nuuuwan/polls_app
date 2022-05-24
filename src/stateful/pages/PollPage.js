import { Component } from "react";
import * as React from "react";

import { MathX } from "@nuuuwan/utils-js-dev";

import Snackbar from "@mui/material/Snackbar";
import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../core/PollsAppServer";

import PollView from "../../stateful/molecules/PollView";
import PollBottomNavigation from "../../nonstate/molecules/PollBottomNavigation";
import NewPollDrawer from "../../stateful/molecules/NewPollDrawer";
import URLContext from "../../core/URLContext";
import AudioX from "../../core/AudioX";
import PollDirectory from "../../stateful/molecules/PollDirectory";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      pollID: undefined,
      showNewPollDrawer: false,
      isSnackbarOpen: false,
    };
  }

  async reloadData() {
    let { pollID } = URLContext.getContext();
    const pollIDs = await PollsAppServer.getPollIDs();

    if (!pollID) {
      pollID = pollIDs[0];
    }

    this.setState({ pollIDs, pollID, showNewPollDrawer: false });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  onClickNewPoll() {
    this.setState({ showNewPollDrawer: true });
    AudioX.playClick();
  }

  onClickRandomPoll() {
    const { pollIDs, pollID } = this.state;
    let newPollID = pollID;
    while (newPollID === pollID) {
      newPollID = pollIDs[MathX.randomInt(0, pollIDs.length)];
    }
    this.setState({ pollID: newPollID });
    AudioX.playClick();
  }

  onClickCopyPoll() {
    navigator.clipboard.writeText(URLContext.getURL());
    this.setState({ isSnackbarOpen: true });
    AudioX.playClick();
  }

  onClickTweet() {
    const tweetText = [
      "🗳 Checkout this #PollsAppLK poll",
      "",
      "#SriLanka",
      URLContext.getURL(),
    ].join("\n");
    const twitterURL =
      "http://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetText);
    window.open(twitterURL, "_blank");
    AudioX.playClick();
  }

  onCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  async onSelectPoll(pollID) {
    URLContext.setContext({ Page: PollPage, pollID });
    await this.reloadData();
    AudioX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async onCloseNewPollDrawer(pollID) {
    this.setState({
      showNewPollDrawer: false,
    });
  }

  render() {
    const { pollIDs, pollID, showNewPollDrawer, isSnackbarOpen } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    URLContext.setContext({ Page: PollPage, pollID });
    const messageSnackbar = <div>Copied Poll URL to Clipboard.</div>;

    return (
      <div>
        <PollView key={"poll-" + pollID} pollID={pollID} />
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
        <PollDirectory
          pollIDs={pollIDs}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </div>
    );
  }
}
