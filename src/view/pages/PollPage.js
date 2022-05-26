import { Component } from "react";
import * as React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import PollsAppServer from "../../nonview/core/PollsAppServer";

import GhostUser from "../../nonview/base/GhostUser";
import PollView from "../../view/organisms/PollView";
import PollBottomNavigation from "../../view/organisms/PollBottomNavigation";
import URLContext from "../../nonview/core/URLContext";
import AudioX from "../../nonview/core/AudioX";
import PollDirectory from "../../view/molecules/PollDirectory";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollIDs: undefined,
      pollID: undefined,
      pollExtendedList: undefined,
    };
  }

  async reloadData() {
    let { pollID } = URLContext.getContext();
    const pollIDs = await PollsAppServer.getPollIDs();
    const geoInfo = await GhostUser.getInfo();

    if (!pollID) {
      pollID = pollIDs[0];
    }

    const userID = geoInfo.userID;
    const pollExtendedList = await Promise.all(
      pollIDs.map(async function (pollID) {
        return await PollsAppServer.getPollExtended(pollID, userID);
      })
    );

    const pollExtendedIdx = pollExtendedList.reduce(function (
      pollExtendedIdx,
      pollExtended
    ) {
      pollExtendedIdx[pollExtended.pollID] = pollExtended;
      return pollExtendedIdx;
    },
    {});

    this.setState({
      pollIDs,
      pollID,
      pollExtendedIdx,
    });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  async onSelectPoll(pollID) {
    URLContext.setContext({ Page: PollPage, pollID });
    await this.reloadData();
    await AudioX.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    const { pollIDs, pollID, pollExtendedIdx } = this.state;
    if (!pollIDs) {
      return <CircularProgress />;
    }
    const pollExtended = pollExtendedIdx[pollID];

    URLContext.setContext({ Page: PollPage, pollID });

    return (
      <div>
        <Box sx={{ marginBotton: 1, maxWidth: "100%" }}>
          <PollView
            pollExtended={pollExtended}
            reloadData={this.reloadData.bind(this)}
          />

          <PollDirectory
            pollExtendedIdx={pollExtendedIdx}
            onSelectPoll={this.onSelectPoll.bind(this)}
          />
        </Box>

        <PollBottomNavigation
          pollExtended={pollExtended}
          onSelectPoll={this.onSelectPoll.bind(this)}
        />
      </div>
    );
  }
}
