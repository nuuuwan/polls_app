import React from "react";
import Typography from "@mui/material/Typography";
import { VERSION } from "../../constants/Version";

export default function VersionWidget() {
  return (
    <Typography
      sx={{
        fontSize: "50%",
        color: "gray",
        textAlign: "center",
      }}
    >
      Last Updated {VERSION}
    </Typography>
  );
}
