import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import StatisticsXFuture from "../../base/StatisticsXFuture";
export default function PollStatisticsView({
  answerList,
  totalVotes,
  answerToVotes,
}) {
  totalVotes = totalVotes ? totalVotes : 0;
  const renderedTotalVotes = (
    <Typography variant="body2">{totalVotes + " votes"}</Typography>
  );

  if (totalVotes < StatisticsXFuture.MIN_STATISTICAL_N) {
    return renderedTotalVotes;
  }

  const sortedAnswerStats = answerList
    .map(function (answer) {
      const answerVotes = answerToVotes[answer] ? answerToVotes[answer] : 0;
      const { p, stdev } = StatisticsXFuture.getErrorBounds(
        totalVotes,
        answerVotes
      );
      return { answer, p, stdev };
    })
    .sort(function (answerA, answerB) {
      return answerB.p - answerA.p;
    });

  const topAnswerStats = sortedAnswerStats[0];
  const nextAnswerStats = sortedAnswerStats[1];

  let significanceStr = "Too close to call";
  let z, label;
  for ([z, label] of [
    [3, "significantly"],
    [2, "slightly"],
  ]) {
    const topLower = topAnswerStats.p - topAnswerStats.stdev * z;
    const nextUpper = nextAnswerStats.p + nextAnswerStats.stdev * z;
    const gap = topLower - nextUpper;
    if (gap > 0) {
      significanceStr = `"${topAnswerStats.answer}" leads ${label}`;
      break;
    }
  }

  return (
    <Stack direction="column">
      <Typography variant="caption" sx={{ color: "gray" }}>
        {significanceStr}
      </Typography>
      {renderedTotalVotes}
    </Stack>
  );
}