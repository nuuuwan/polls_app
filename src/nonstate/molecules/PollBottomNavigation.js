import React from "react";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function PollBottomNavigation({
  onClickNewPoll,
  onClickPreviousPoll,
  onClickNextPoll,
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
          label="Previous"
          icon={<ArrowBackIosIcon />}
          onClick={onClickPreviousPoll}
        />
        <BottomNavigationAction
          label="Next"
          icon={<ArrowForwardIosIcon />}
          onClick={onClickNextPoll}
        />
        <BottomNavigationAction
          label="Add New"
          icon={<AddIcon />}
          onClick={onClickNewPoll}
        />
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
      </BottomNavigation>
    </Paper>
  );
}
