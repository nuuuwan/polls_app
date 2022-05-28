import React from "react";

import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";

import CustomAppBarMenu from "./CustomAppBarMenu";

const STYLE = {
  position: "fixed",
  top: 0,
  left: 0,
};

export default function CustomAppBar({ onSelectPage, geoInfo, Page }) {
  return (
    <Grid container sx={STYLE} justifyContent="flex-end">
      <Toolbar variant="dense">
        <CustomAppBarMenu onSelectPage={onSelectPage} Page={Page} />
      </Toolbar>
    </Grid>
  );
}
