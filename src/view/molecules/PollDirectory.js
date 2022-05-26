import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import PollTitle from "../../view/molecules/PollTitle";


export default function PollDirectory({pollExtendedIdx, onSelectPoll}) {
  return (
    <Stack spacing={1}>
      <List>
        {Object.entries(pollExtendedIdx).map(function ([pollID, pollExtended]) {
          const onClick = function (e) {
            onSelectPoll(pollID);
          };
          return (
            <ListItem key={"poll-directory-item-" + pollID}>
              <ListItemButton onClick={onClick}>
                <PollTitle pollExtended={pollExtended} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Stack>
  );
}
