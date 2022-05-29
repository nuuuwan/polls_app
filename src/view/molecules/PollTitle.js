import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import AlignCenter from "../../view/atoms/AlignCenter";
import Condition from "../../view/atoms/Condition";
import PollStatistics from "../../view/molecules/PollStatistics";
import PollVisibility from "../../view/molecules/PollVisibility";

export default function PollTitle({ pollExtended, small }) {
  const isUserAnswer =
    pollExtended.userAnswer && pollExtended.userAnswer !== "";

  const theme = useTheme();
  const color = isUserAnswer
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const fontSize = small ? "small" : "normal";
  const fontSizeSmall = small ? "x-small" : "small";

  return (
    <Stack>
      <Typography style={{ fontSize: fontSize, color: color }}>
        {pollExtended.question}
      </Typography>

      <AlignCenter>
        <PollStatistics pollExtended={pollExtended} small={small} />

        <Divider orientation="vertical" variant="middle" flexItem />

        <PollVisibility pollExtended={pollExtended} small={small} />
      </AlignCenter>

      <Condition condition={isUserAnswer}>
        <AlignCenter>
          <CheckCircleIcon sx={{ fontSize: fontSizeSmall, color: color }} />
          <Typography style={{ fontSize: fontSizeSmall, color: color }}>
            You voted "{pollExtended.userAnswer}"
          </Typography>
        </AlignCenter>
      </Condition>
    </Stack>
  );
}
