import { Component } from "react";

import CircularProgress from "@mui/material/CircularProgress";

import GhostUser from "../../nonview/base/GhostUser";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import URLContext from "../../nonview/core/URLContext";

import PollDirectoryMolecule from "../../view/molecules/PollDirectoryMolecule";
import PollPage from "../../view/pages/PollPage";

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

  async onSelectPoll(pollID) {
    URLContext.setContext({ Page: PollPage, pollID });
    await this.props.refresh();
  }

  render() {
    const { pollExtendedIdx } = this.state;
    if (!pollExtendedIdx) {
      return <CircularProgress />;
    }
    return (
      <PollDirectoryMolecule
        pollExtendedIdx={pollExtendedIdx}
        onSelectPoll={this.onSelectPoll.bind(this)}
      />
    );
  }
}
