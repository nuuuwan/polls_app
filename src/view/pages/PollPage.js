import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { TimeX } from '@nuuuwan/utils-js-dev';

import AudioX from "../../nonview/core/AudioX";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import URLContext from "../../nonview/core/URLContext";
import PollView from "../../view/organisms/PollView";
import PollBottomNavigation from "../../view/organisms/PollBottomNavigation";
import PollDirectory from "../../view/organisms/PollDirectory";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      pollID: undefined,
      timeLastUpdated: 0,
    };
  }

  async componentDidMount() {
    let { pollID } = URLContext.getContext();
    if (!pollID) {
      const pollIDs = await PollsAppServer.getPollIDs();
      pollID = pollIDs[0];
    }
    this.refresh(pollID);
  }

  refresh(pollID) {
    this.setState({
      pollID,
      timeLastUpdated: TimeX.getUnixTime(),
    });
  }

  async onSelectPoll(pollID) {
    await AudioX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.refresh(pollID);
  }

  render() {
    const { pollID, timeLastUpdated } = this.state;
    if (!pollID) {
      return <CircularProgress />;
    }
    URLContext.setContext({ Page: PollPage, pollID });

    return (
      <div>
        <Box sx={{ marginBotton: 1, maxWidth: "100%" }}>
          <PollView
            key={"poll-view-" + pollID + "-" + timeLastUpdated}
            pollID={pollID}
            onSelectPoll={this.onSelectPoll.bind(this)}
          />
          <PollDirectory
            key={"poll-directory-" + timeLastUpdated}
            onSelectPoll={this.onSelectPoll.bind(this)}
          />
        </Box>

        <PollBottomNavigation
          key={"poll-bottom-navigation-" + timeLastUpdated}
          pollID={pollID}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </div>
    );
  }
}
