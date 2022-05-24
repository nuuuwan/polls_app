import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

import PollStatisticsView from "../../nonstate/molecules/PollStatisticsView";
import { MathX } from "@nuuuwan/utils-js-dev";
import { PublicIcon, UnlistedIcon } from "../../constants/CommonIcons";
import AlignCenter from "../../nonstate/atoms/AlignCenter";
import Condition from "../../nonstate/atoms/Condition";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function PollTitle({ pollExtended }) {
  const VisibilityIcon =
    pollExtended.visibility === "public" ? PublicIcon : UnlistedIcon;

  const isUserAnswer =
    pollExtended.userAnswer && pollExtended.userAnswer !== "";

  const theme = useTheme();
  const color = isUserAnswer
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  const totalCount = MathX.sum(Object.values(pollExtended.answerToCount));

  return (
    <Stack>
      <Typography variant="h6" color={color}>
        {pollExtended.question}
      </Typography>

      <AlignCenter>
        <PollStatisticsView
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
