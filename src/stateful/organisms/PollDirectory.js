import { Component } from "react";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PollDirectoryItem from "../../stateful/organisms/PollDirectoryItem";

export default class PollDirectory extends Component {
  render() {
    const { pollIDs, onSelectPoll } = this.props;
    return (
      <Stack spacing={1}>
        <List>
          {pollIDs.map(function (pollID) {
            const onClick = function (e) {
              onSelectPoll(pollID);
            };
            return (
              <ListItem key={"poll-directory-item" + pollID}>
                <ListItemButton onClick={onClick}>
                  <PollDirectoryItem pollID={pollID} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Stack>
    );
  }
}
