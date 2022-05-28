import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { PublicIcon, UnlistedIcon } from "../../view/_constants/CommonIcons";
import AlignCenter from "../../view/atoms/AlignCenter";
import Condition from "../../view/atoms/Condition";
import PollStatistics from "../../view/molecules/PollStatistics";

export default function PollTitle({ pollExtended, small }) {
  const VisibilityIcon =
    pollExtended.visibility === "public" ? PublicIcon : UnlistedIcon;

  const isUserAnswer =
    pollExtended.userAnswer && pollExtended.userAnswer !== "";

  const theme = useTheme();
  const color = isUserAnswer
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const totalCount = pollExtended.totalCount;
  const fontSize = small ? "small" : "normal";
  const fontSizeSmall = small ? "x-small" : "small";

  return (
    <Stack>
      <Typography style={{ fontSize: fontSize, color: color }}>
        {pollExtended.question}
      </Typography>

      <AlignCenter>
        <PollStatistics
          answerList={pollExtended.answerList}
          totalCount={totalCount}
          answerToCount={pollExtended.answerToCount}
          small={small}
        />

        <Divider orientation="vertical" variant="middle" flexItem />

        <VisibilityIcon sx={{ fontSize: fontSizeSmall, color: "gray" }} />
        <Typography sx={{ fontSize: fontSizeSmall, color: "gray" }}>
          {pollExtended.visibility}
        </Typography>
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
