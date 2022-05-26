import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import Hash from "../../nonview/base/Hash";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import GhostUser from "../../nonview/base/GhostUser";
import PollView from "../../view/organisms/PollView";
import PollBottomNavigation from "../../view/organisms/PollBottomNavigation";
import URLContext from "../../nonview/core/URLContext";
import AudioX from "../../nonview/core/AudioX";
import PollDirectory from "../../view/organisms/PollDirectory";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      pollID: undefined,
      pollExtendedList: undefined,
    };
  }

  async componentDidMount() {
    let { pollID } = URLContext.getContext();
    if (!pollID) {
      const pollIDs = await PollsAppServer.getPollIDs();
      pollID = pollIDs[0];
    }

    this.setState({
      pollID,
    });
  }

  async onSelectPoll(pollID) {
    URLContext.setContext({ Page: PollPage, pollID });
    await AudioX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
    this.setState({
      pollID,
    });
  }

  render() {
    const { pollID, pollExtendedIdx } = this.state;
    if (!pollID) {
      return <CircularProgress />;
    }

    URLContext.setContext({ Page: PollPage, pollID });
    const dataHash = Hash.md5(pollExtendedIdx);

    return (
      <div>
        <Box sx={{ marginBotton: 1, maxWidth: "100%" }}>
          <PollView
            key={"poll-view-" + pollID}
            pollID={pollID}
          />
          <PollDirectory
            key={"poll-directory-" + dataHash}
            onSelectPoll={this.onSelectPoll.bind(this)}
          />
        </Box>

        <PollBottomNavigation
          pollID={pollID}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </div>
    );
  }
}
