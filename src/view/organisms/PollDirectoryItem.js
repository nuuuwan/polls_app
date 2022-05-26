import { Component } from "react";

import GhostUserX from "../../nonview/base/GhostUserX";
import PollsAppServer from "../../nonview/core/PollsAppServer";

import PollTitle from "../../view/molecules/PollTitle";

export default class PollDirectoryItem extends Component {
  constructor(props) {
    super(props);
    this.state = { pollExtended: null };
  }

  async componentDidMount() {
    const { pollID } = this.props;
    const geoInfo = await await GhostUserX.getInfo();
    const userID = geoInfo.infoHash;
    const pollExtended = await PollsAppServer.getPollExtended(pollID, userID);
    this.setState({ pollExtended });
  }

  render() {
    const { pollExtended } = this.state;
    if (!pollExtended) {
      return null;
    }

    return <PollTitle pollExtended={pollExtended} />;
  }
}

// import PollDirectoryItem from "../../view/organisms/PollDirectoryItem";
