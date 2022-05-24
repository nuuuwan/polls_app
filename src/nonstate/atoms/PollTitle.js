import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import PollStatisticsView from "../../nonstate/molecules/PollStatisticsView";

import { TimeX, MathX } from "@nuuuwan/utils-js-dev";
import {
  PollIcon,
  PublicIcon,
  UnlistedIcon,
} from "../../constants/CommonIcons";
import AlignCenter from "../../nonstate/atoms/AlignCenter";

export default function PollTitle({ pollExtended }) {
  const VisibilityIcon = pollExtended.visibility === "public" ? PublicIcon : UnlistedIcon;

  const totalCount = MathX.sum(Object.values(pollExtended.answerToCount));

  return (
    <Stack>
      <AlignCenter>
        <VisibilityIcon sx={{ fontSize: "small", color: "gray" }} />
        <Typography sx={{ fontSize: "small", color: "gray" }}>
          {pollExtended.visibility}
        </Typography>
      </AlignCenter>

      <AlignCenter>
        <PollIcon />
        <Typography variant="subtitle1">
          {pollExtended.question}
        </Typography>
      </AlignCenter>

      <PollStatisticsView
        answerList={pollExtended.answerList}
        totalCount={totalCount}
        answerToCount={pollExtended.answerToCount}
      />
    </Stack>
  );
}
