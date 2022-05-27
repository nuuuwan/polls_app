import { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import GhostUser from "../../nonview/base/GhostUser";
import PollsAppServer from "../../nonview/core/PollsAppServer";

import PollDirectoryMolecule from "../../view/molecules/PollDirectoryMolecule";

export default class PollDirectory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pollExtendedIdx: undefined,
    };
  }

  async componentDidMount() {
    const pollIDs = await PollsAppServer.getPollIDs();
    const geoInfo = await GhostUser.getInfo();
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
      pollExtendedIdx,
    });
  }

  render() {
    const { pollExtendedIdx } = this.state;
    if (!pollExtendedIdx) {
      return <CircularProgress />;
    }

    const { onSelectPoll } = this.props;

    return (
      <PollDirectoryMolecule
        pollExtendedIdx={pollExtendedIdx}
        onSelectPoll={onSelectPoll}
      />
    );
  }
}
