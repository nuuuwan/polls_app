import { Component } from "react";
import Paper from "@mui/material/Paper";

import GhostUserX from "../../base/GhostUserX";
import PollsAppServer from "../../core/PollsAppServer";

import PollTitle from "../../nonstate/atoms/PollTitle";

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

    return (
      <Paper sx={{ p: 2, width: "100%" }}>
        <PollTitle
          question={pollExtended.question}
          visibility={pollExtended.visibility}
        />
      </Paper>
    );
  }
}

// import PollDirectoryItem from "../../stateful/molecules/PollDirectoryItem";
