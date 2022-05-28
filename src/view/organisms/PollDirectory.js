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
    const userID = await GhostUser.getUserID();
    const pollExtendedIdx = await PollsAppServer.getPollExtendedIdxForUser(
      userID
    );


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
