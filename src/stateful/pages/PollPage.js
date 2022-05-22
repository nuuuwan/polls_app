import { Component } from "react";
import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../core/PollsAppServer";

import PollView from "../../stateful/molecules/PollView";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation";
import NewPollDrawer from "../../stateful/molecules/NewPollDrawer";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: null,
      activePollI: 0,
      showNewPollDrawer: false,
    };
  }

  async reloadData() {
    const pollIDs = await PollsAppServer.getPollIDs();
    const activePollId = pollIDs ? pollIDs[0].pollID : null;
    this.setState({
      pollIDs,
      activePollId,
    });
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

  async onCloseNewPollDrawer(pollID) {
    let { pollIDs } = this.state;
    pollIDs.push(pollID);
    this.setState({
      activePollI: pollIDs.length - 1,
      pollIDs: pollIDs,
      showNewPollDrawer: false,
    });
  }

  render() {
    const { pollIDs, activePollI, showNewPollDrawer } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    const pollID = pollIDs[activePollI];
    return (
      <div>
        <PollView key={"poll-" + pollID} pollID={pollID} />
        <NewPollDrawer
          isOpen={showNewPollDrawer}
          onClose={this.onCloseNewPollDrawer.bind(this)}
        />
        <CustomBottomNavigation
          onClickNewPoll={this.onClickNewPoll.bind(this)}
          onClickPreviousPoll={this.onClickPreviousPoll.bind(this)}
          onClickNextPoll={this.onClickNextPoll.bind(this)}
        />
      </div>
    );
  }
}
