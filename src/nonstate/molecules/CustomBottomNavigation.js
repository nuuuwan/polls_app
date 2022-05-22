import React from "react";

import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AddIcon from "@mui/icons-material/Add";

export default function CustomBottomNavigation({ onClickNewPoll }) {
  return (
    <Paper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
    >
      <BottomNavigation showLabels>
        <BottomNavigationAction
          label="Add New Poll"
          icon={<AddIcon />}
          onClick={onClickNewPoll}
        />
      </BottomNavigation>
    </Paper>
  );
}
