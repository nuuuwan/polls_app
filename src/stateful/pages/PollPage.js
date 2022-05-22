import { Component } from "react";
import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../core/PollsAppServer";

import PollView from "../../stateful/molecules/PollView";
import PollBottomNavigation from "../../nonstate/molecules/PollBottomNavigation";
import NewPollDrawer from "../../stateful/molecules/NewPollDrawer";
import URLContext from "../../core/URLContext";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      activePollI: undefined,
      showNewPollDrawer: false,
    };
  }

  async reloadData() {
    const { pollID } = URLContext.getContext();
    const pollIDs = await PollsAppServer.getPollIDs();

    let activePollI = pollIDs.indexOf(pollID);
    activePollI = activePollI === -1 ? 0 : activePollI;

    this.setState({ pollIDs, activePollI });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  onClickNewPoll() {
    this.setState({ showNewPollDrawer: true });
  }

  onClickNextPoll() {
    const { activePollI, pollIDs } = this.state;
    this.setState({
      activePollI: activePollI === pollIDs.length - 1 ? 0 : activePollI + 1,
    });
  }

  onClickPreviousPoll() {
    const { activePollI, pollIDs } = this.state;
    this.setState({
      activePollI: activePollI === 0 ? pollIDs.length - 1 : activePollI - 1,
    });
  }

  async onAddNewPoll(pollID) {
    let { pollIDs } = this.state;
    pollIDs.push(pollID);
    this.setState({
      activePollI: pollIDs.length - 1,
      pollIDs: pollIDs,
      showNewPollDrawer: false,
    });
  }

  async onCloseNewPollDrawer(pollID) {
    this.setState({
      showNewPollDrawer: false,
    });
  }

  render() {
    const { pollIDs, activePollI, showNewPollDrawer } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    const pollID = pollIDs[activePollI];
    URLContext.setContext({ Page: PollPage, pollID });

    return (
      <div>
        <PollView key={"poll-" + pollID} pollID={pollID} />
        <NewPollDrawer
          isOpen={showNewPollDrawer}
          onClose={this.onCloseNewPollDrawer.bind(this)}
          onAddNewPoll={this.onAddNewPoll.bind(this)}
        />
        <PollBottomNavigation
          onClickNewPoll={this.onClickNewPoll.bind(this)}
          onClickPreviousPoll={this.onClickPreviousPoll.bind(this)}
          onClickNextPoll={this.onClickNextPoll.bind(this)}
        />
      </div>
    );
  }
}
