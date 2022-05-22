import { Component } from "react";
import * as React from "react";

import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../core/PollsAppServer";

import PollView from "../../stateful/molecules/PollView";
import CustomBottomNavigation from "../../nonstate/molecules/CustomBottomNavigation";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = { pollIDs: null };
  }

  async componentDidMount() {
    this.setState({
      pollIDs: await PollsAppServer.getPollIDs(),
    });
  }

  render() {
    const { pollIDs } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }

    return (
      <div>
        {pollIDs.map(function (pollID) {
          return <PollView key={"poll-" + pollID} pollID={pollID} />;
        })}
        <CustomBottomNavigation />
      </div>
    );
  }
}
