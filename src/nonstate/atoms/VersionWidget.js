import React from "react";
import Typography from "@mui/material/Typography";
import { VERSION } from "../../constants/Version";

const STYLE_VERSION = {
  fontSize: "50%",
  color: "gray",
  textAlign: "center",
};

export default function VersionWidget() {
  return (
    <Typography sx={STYLE_VERSION}>Last Updated {VERSION}</Typography>
  );
}
