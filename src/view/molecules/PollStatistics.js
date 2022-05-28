import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import Statistics from "../../nonview/base/Statistics";

import Condition from "../../view/atoms/Condition";

export default function PollStatistics({ pollExtended, small }) {
  console.debug(pollExtended, pollExtended.totalCount);
  const fontSize = small ? "x-small" : "small";
  const renderedTotalVotes = (
    <Typography style={{ fontSize }}>
      {pollExtended.totalCount + " votes"}
    </Typography>
  );

  let significanceStr = "";
  if (pollExtended.totalCount > Statistics.MIN_STATISTICAL_N) {
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
        <Typography sx={{ fontSize: fontSize, color: "gray" }}>
          {significanceStr}
        </Typography>
      </Condition>
    </>
  );
}
