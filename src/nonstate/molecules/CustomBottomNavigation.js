import React from "react";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function CustomBottomNavigation({
  onClickNewPoll,
  onClickPreviousPoll,
  onClickNextPoll,
}) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Previous Poll"
          icon={<ArrowBackIosIcon />}
          onClick={onClickPreviousPoll}
        />
        <BottomNavigationAction
          label="Add New Poll"
          icon={<AddIcon />}
          onClick={onClickNewPoll}
        />
        <BottomNavigationAction
          label="Next Poll"
          icon={<ArrowForwardIosIcon />}
          onClick={onClickNextPoll}
        />
      </BottomNavigation>
    </Paper>
  );
}
