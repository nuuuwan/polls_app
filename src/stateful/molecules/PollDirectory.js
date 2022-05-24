import { Component } from "react";
import Stack from "@mui/material/Stack";
import PollDirectoryItem from "../../stateful/molecules/PollDirectoryItem";

export default class PollDirectory extends Component {
  render() {
    const { pollIDs } = this.props;
    return (
      <Stack spacing={1}>
        {pollIDs.map(function (pollID) {
          return (
            <PollDirectoryItem
              key={"poll-directory-item" + pollID}
              pollID={pollID}
            />
          );
        })}
      </Stack>
    );
  }
}
