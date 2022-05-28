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
    <List style={{ marginTop: "10%" }}>
      <Stack spacing={3}>
        {Object.entries(pollExtendedIdx).map(function ([pollID, pollExtended]) {
          const onSelectPollInner = function (e) {
            onSelectPoll(pollID);
          };
          return (
            <ListItem key={"poll-directory-item-" + pollID} sx={{ p: 0 }}>
              <ListItemButton onClick={onSelectPollInner} sx={{ p: 0 }}>
                <PollTitle pollExtended={pollExtended} small />
              </ListItemButton>
            </ListItem>
          );
        })}
      </Stack>
    </List>
  );
}
