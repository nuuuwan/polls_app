import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import {
  PollIcon,
  PublicIcon,
  UnlistedIcon,
} from "../../constants/CommonIcons";
import AlignCenter from "../../nonstate/atoms/AlignCenter";

export default function PollTitle({ question, visibility }) {
  const VisibilityIcon = visibility === "public" ? PublicIcon : UnlistedIcon;

  return (
    <Stack>
      <AlignCenter>
        <VisibilityIcon sx={{ fontSize: "small", color: "gray" }} />
        <Typography sx={{ fontSize: "small", color: "gray" }}>
          {visibility}
        </Typography>
      </AlignCenter>

      <AlignCenter>
        <PollIcon />
        <Typography variant="subtitle1">{question}</Typography>
      </AlignCenter>
    </Stack>
  );
}
