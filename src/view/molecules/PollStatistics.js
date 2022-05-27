import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Statistics from "../../nonview/base/Statistics";

import Condition from "../../view/atoms/Condition";

export default function PollStatistics({
  answerList,
  totalCount,
  answerToCount,
}) {
  totalCount = totalCount ? totalCount : 0;
  const renderedTotalVotes = (
    <Typography variant="body2">{totalCount + " votes"}</Typography>
  );

  let significanceStr = "";
  if (totalCount > Statistics.MIN_STATISTICAL_N) {
    const sortedAnswerStats = answerList
      .map(function (answer) {
        const answerVotes = answerToCount[answer] ? answerToCount[answer] : 0;
        const { lower, upper, p } = Statistics.getErrorBounds(
          totalCount,
          answerVotes
        );
        return { answer, lower, upper, p };
      })
      .sort(function (answerA, answerB) {
        return answerB.p - answerA.p;
      });

    const topAnswerStats = sortedAnswerStats[0];
    const nextAnswerStats = sortedAnswerStats[1];

    significanceStr = "Too close to call";
    const topLower = topAnswerStats.lower;
    const nextUpper = nextAnswerStats.upper;
    const gap = topLower - nextUpper;
    if (gap > 0) {
      significanceStr = `"${topAnswerStats.answer}" leads`;
    }
  }

  return (
    <>
      {renderedTotalVotes}
      <Condition condition={significanceStr}>
        <Divider orientation="vertical" variant="middle" flexItem />
        <Typography variant="caption" sx={{ color: "gray" }}>
          {significanceStr}
        </Typography>
      </Condition>
    </>
  );
}
