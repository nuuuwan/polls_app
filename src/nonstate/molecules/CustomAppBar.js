import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomAppBarMenu from "./CustomAppBarMenu";

const STYLE = {
  backgroundColor: "lightgray",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
};

export default function CustomAppBar({ onSelectPage }) {
  return (
    <AppBar sx={STYLE}>
      <Toolbar variant="dense">
        <CustomAppBarMenu onSelectPage={onSelectPage} />

        <Typography component="div" sx={{ flexGrow: 1 }}>
          {"Polls App"}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
