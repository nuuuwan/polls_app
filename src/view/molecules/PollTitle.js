import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { PublicIcon, UnlistedIcon } from "../../view/_constants/CommonIcons";
import AlignCenter from "../../view/atoms/AlignCenter";
import Condition from "../../view/atoms/Condition";
import PollStatistics from "../../view/molecules/PollStatistics";

export default function PollTitle({ pollExtended }) {
  const VisibilityIcon =
    pollExtended.visibility === "public" ? PublicIcon : UnlistedIcon;

  const isUserAnswer =
    pollExtended.userAnswer && pollExtended.userAnswer !== "";

  const theme = useTheme();
  const color = isUserAnswer
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const totalCount = pollExtended.totalCount;

  return (
    <Stack>
      <Typography variant="h6" color={color}>
        {pollExtended.question}
      </Typography>

      <AlignCenter>
        <PollStatistics
          answerList={pollExtended.answerList}
          totalCount={totalCount}
          answerToCount={pollExtended.answerToCount}
        />

        <Divider orientation="vertical" variant="middle" flexItem />

        <VisibilityIcon sx={{ fontSize: "small", color: "gray" }} />
        <Typography sx={{ fontSize: "small", color: "gray" }}>
          {pollExtended.visibility}
        </Typography>
      </AlignCenter>

      <Condition condition={isUserAnswer}>
        <AlignCenter>
          <CheckCircleIcon sx={{ fontSize: "small", color: color }} />
          <Typography style={{ fontSize: "small", color: color }}>
            You voted "{pollExtended.userAnswer}"
          </Typography>
        </AlignCenter>
      </Condition>
    </Stack>
  );
}
