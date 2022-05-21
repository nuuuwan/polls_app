import { Component } from "react";
import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../core/PollsAppServer";

import PollView from "../../stateful/molecules/PollView";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iActivePoll: 0,
      pollIDs: null,
    };
  }

  onClickPrevious() {
    const { pollIDs, iActivePoll } = this.state;
    const newIActivePoll =
      iActivePoll === 0 ? pollIDs.length - 1 : iActivePoll - 1;
    this.setState({ iActivePoll: newIActivePoll });
  }

  onClickNext() {
    const { pollIDs, iActivePoll } = this.state;
    const newIActivePoll =
      iActivePoll === pollIDs.length - 1 ? 0 : iActivePoll + 1;
    this.setState({ iActivePoll: newIActivePoll });
  }

  async componentDidMount() {
    const pollIDs = await PollsAppServer.getPollIDs();
    this.setState({
      pollIDs,
    });
  }

  render() {
    const { pollIDs, iActivePoll } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    const activePollID = pollIDs[iActivePoll];

    return (
      <div key={"poll-" + activePollID}>
        <PollView pollID={activePollID} />
        <CustomBottomNavigation
          onClickPrevious={this.onClickPrevious.bind(this)}
          onClickNext={this.onClickNext.bind(this)}
        />
      </div>
    );
  }
}
