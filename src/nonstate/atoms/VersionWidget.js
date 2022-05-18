import React from "react";
import Typography from "@mui/material/Typography";
import { DATE_LAST_UPDATE } from "../../constants/Constants.js";

const STYLE_VERSION = {
  fontSize: "50%",
  color: "gray",
  textAlign: "center",
  position: "fixed",
  bottom: 60,
  left: 0,
  right: 0,
};

export default function VersionWidget() {
  return (
    <Typography sx={STYLE_VERSION}>Last Updated {DATE_LAST_UPDATE}</Typography>
  );
}
