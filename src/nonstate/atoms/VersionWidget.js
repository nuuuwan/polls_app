import React from "react";
import Typography from "@mui/material/Typography";
import { DATE_LAST_UPDATE } from "../../constants/Constants";

const STYLE_VERSION = {
  fontSize: "50%",
  color: "gray",
  textAlign: "center",
};

export default function VersionWidget() {
  return (
    <Typography sx={STYLE_VERSION}>Last Updated {DATE_LAST_UPDATE}</Typography>
  );
}
