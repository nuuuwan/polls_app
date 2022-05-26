import { Component } from "react";

import Snackbar from "@mui/material/Snackbar";
import { MathX } from "@nuuuwan/utils-js-dev";
import AudioX from "../../nonview/core/AudioX";
import URLContext from "../../nonview/core/URLContext";
import PollBottomNavigationMolecule from "../../view/molecules/PollBottomNavigationMolecule";
import AddNewPollDrawer from "./AddNewPollDrawer";

export default class PollBottomNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewPollDrawer: false,
      isSnackbarOpen: false,
    };
  }

  async onClickNewPoll() {
    this.setState({ showNewPollDrawer: true });
    await AudioX.playClick();
  }

  async onClickRandomPoll() {
    const { pollIDs, pollID, onSelectPoll } = this.props;
    let newPollID = pollID;
    while (newPollID === pollID) {
      newPollID = pollIDs[MathX.randomInt(0, pollIDs.length)];
    }
    onSelectPoll(newPollID);
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

  async onCloseNewPollDrawer(pollID) {
    this.setState({
      showNewPollDrawer: false,
    });
  }

  onCloseSnackbar() {
    this.setState({ isSnackbarOpen: false });
  }

  render() {
    const { showNewPollDrawer, isSnackbarOpen } = this.state;
    const { onSelectPoll } = this.props;
    const messageSnackbar = <div>Copied Poll URL to Clipboard.</div>;

    return (
      <>
        <AddNewPollDrawer
          isOpen={showNewPollDrawer}
          onClose={this.onCloseNewPollDrawer.bind(this)}
          onAddNewPoll={onSelectPoll}
        />
        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={1000}
          onClose={this.onCloseSnackbar.bind(this)}
          message={messageSnackbar}
        />
        <PollBottomNavigationMolecule
          onClickNewPoll={this.onClickNewPoll.bind(this)}
          onClickRandomPoll={this.onClickRandomPoll.bind(this)}
          onClickCopyPoll={this.onClickCopyPoll.bind(this)}
          onClickTweet={this.onClickTweet.bind(this)}
        />
      </>
    );
  }
}
