import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Statistics from "../../nonview/base/Statistics";

export default function PollStatisticsSignificance({ pollExtended, small }) {
  if (pollExtended.totalCount < Statistics.MIN_STATISTICAL_N) {
    return null;
  }

  const sortedAnswerStats = pollExtended.answerList
    .map(function (answer) {
      const answerVotes = pollExtended.answerToCount[answer];
      const { lower, upper, p } = Statistics.getErrorBounds(
        pollExtended.totalCount,
        answerVotes
      );
      return { answer, lower, upper, p };
    })
    .sort(function (answerA, answerB) {
      return answerB.p - answerA.p;
    });

  const topAnswerStats = sortedAnswerStats[0];
  const nextAnswerStats = sortedAnswerStats[1];

  const topLower = topAnswerStats.lower;
  const nextUpper = nextAnswerStats.upper;

  const gap = topLower - nextUpper;
  const significanceStr =
    gap > 0 ? `"${topAnswerStats.answer}" leads` : "Too close to call";

  const fontSize = small ? "x-small" : "small";
  return (
    <>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Typography sx={{ fontSize: fontSize, color: "gray" }}>
        {significanceStr}
      </Typography>
    </>
  );
}
