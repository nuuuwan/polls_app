import React from "react";

import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AudioX from "../../nonview/core/AudioX";

import CustomAppBarMenu from "./CustomAppBarMenu";
import IDAvatar from "../molecules/IDAvatar";
import UserPage from "../../view/pages/UserPage";

const STYLE = {
  backgroundColor: "lightgray",
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: 50,
};

export default function CustomAppBar({ onSelectPage, geoInfo, Page }) {
  const onClickUser = async function () {
    onSelectPage(UserPage);
    await AudioX.playClick();
  };
  return (
    <AppBar sx={STYLE}>
      <Toolbar variant="dense">
        <CustomAppBarMenu onSelectPage={onSelectPage} Page={Page} />

        <Typography component="div" sx={{ flexGrow: 1 }}>
          {"Polls App"}
        </Typography>

        <IconButton
          sx={{ p: 0 }}
          onClick={onClickUser}
          aria-label="CustomAppBar.avatar.button"
        >
          <IDAvatar id={geoInfo.userID} size={40} />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
