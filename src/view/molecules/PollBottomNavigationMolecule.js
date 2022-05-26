import React from "react";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TwitterIcon from "@mui/icons-material/Twitter";
import ShuffleIcon from "@mui/icons-material/Shuffle";

export default function PollBottomNavigationMolecule({
  onClickRandomPoll,
  onClickNewPoll,
  onClickCopyPoll,
  onClickTweet,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Copy"
          icon={<ContentCopyIcon />}
          onClick={onClickCopyPoll}
        />
        <BottomNavigationAction
          label="Share"
          icon={<TwitterIcon />}
          onClick={onClickTweet}
        />
        <BottomNavigationAction
          label="Add New"
          icon={<AddIcon />}
          onClick={onClickNewPoll}
        />
        <BottomNavigationAction
          label="Random"
          icon={<ShuffleIcon />}
          onClick={onClickRandomPoll}
        />
      </BottomNavigation>
    </Paper>
  );
}
