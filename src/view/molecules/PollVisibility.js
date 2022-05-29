import Typography from "@mui/material/Typography";

import { PublicIcon, UnlistedIcon } from "../../view/_constants/CommonIcons";

export default function PollVisibility({ pollExtended, small }) {
  const fontSizeSmall = small ? "x-small" : "small";

  const VisibilityIcon =
    pollExtended.visibility === "public" ? PublicIcon : UnlistedIcon;

  return (
    <>
      <VisibilityIcon sx={{ fontSize: fontSizeSmall, color: "gray" }} />
      <Typography sx={{ fontSize: fontSizeSmall, color: "gray" }}>
        {pollExtended.visibility}
      </Typography>
    </>
  );
}
