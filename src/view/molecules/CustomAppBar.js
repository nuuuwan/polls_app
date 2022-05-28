import React from "react";

import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import AudioX from "../../nonview/core/AudioX";

import CustomAppBarMenu from "./CustomAppBarMenu";
import IDAvatar from "../molecules/IDAvatar";
import UserPage from "../../view/pages/UserPage";

const STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
};

export default function CustomAppBar({ onSelectPage, geoInfo, Page }) {
  const onClickUser = async function () {
    onSelectPage(UserPage);
    await AudioX.playClick();
  };
  return (
    <Grid container sx={STYLE} justifyContent="flex-end">
      <Toolbar variant="dense">
        <CustomAppBarMenu onSelectPage={onSelectPage} Page={Page} />
      </Toolbar>
    </Grid>
  );
}
