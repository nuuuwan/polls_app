import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";

import PollTitle from "../../view/molecules/PollTitle";

export default function PollDirectoryMolecule({
  pollExtendedIdx,
  onSelectPoll,
}) {
  return (
    <Stack spacing={1}>
      <List>
        {Object.entries(pollExtendedIdx).map(function ([pollID, pollExtended]) {
          const onSelectPollInner = function (e) {
            onSelectPoll(pollID);
          };
          return (
            <ListItem key={"poll-directory-item-" + pollID}>
              <ListItemButton onClick={onSelectPollInner}>
                <PollTitle pollExtended={pollExtended} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
