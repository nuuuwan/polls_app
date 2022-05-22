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
      showNewPollDrawer: false,
    };
  }

  async reloadData() {
    this.setState({
      pollIDs: await PollsAppServer.getPollIDs(),
    });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  onClickNewPoll() {
    this.setState({ showNewPollDrawer: true });
  }

  async onCloseNewPollDrawer() {
    this.setState({ showNewPollDrawer: false });
    await this.reloadData();
  }

  render() {
    const { pollIDs, showNewPollDrawer } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    return (
      <div>
        {pollIDs.map(function (pollID) {
          return <PollView key={"poll-" + pollID} pollID={pollID} />;
        })}
        <NewPollDrawer
          isOpen={showNewPollDrawer}
          onClose={this.onCloseNewPollDrawer.bind(this)}
        />
        <CustomBottomNavigation
          onClickNewPoll={this.onClickNewPoll.bind(this)}
        />
      </div>
    );
  }
}
