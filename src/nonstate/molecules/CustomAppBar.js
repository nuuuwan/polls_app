import React from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CustomAppBarMenu from "./CustomAppBarMenu";
import IconButton from "@mui/material/IconButton";
import IDAvatar from "../atoms/IDAvatar";

import UserPage from "../../stateful/pages/UserPage";

const STYLE = {
  backgroundColor: "lightgray",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
};

export default function CustomAppBar({ onSelectPage, geoInfo }) {
  const onClickUser = function () {
    onSelectPage(UserPage);
  };
  return (
    <AppBar sx={STYLE}>
      <Toolbar variant="dense">
        <CustomAppBarMenu onSelectPage={onSelectPage} />

        <Typography component="div" sx={{ flexGrow: 1 }}>
          {"Polls App"}
        </Typography>

        <IconButton sx={{ p: 0 }} onClick={onClickUser}>
          <IDAvatar id={geoInfo.userID} size={40} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
