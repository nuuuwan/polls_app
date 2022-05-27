import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

import AlignCenter from "../../view/atoms/AlignCenter";
import Condition from "../atoms/Condition";
import StatisticalBar from "../atoms/StatisticalBar";

export default function PollAnswer({
  answer,
  totalCount,
  answerVotes,
  showStatistics,
  userAnswer,
}) {
  const isUserAnswer = userAnswer === answer;
  const theme = useTheme();
  const color = isUserAnswer
    ? theme.palette.secondary.main
    : theme.palette.primary.main;

  return (
    <Box sx={{ width: Math.min(window.innerWidth * 0.7, 400) }}>
      <FormControlLabel
        value={answer}
        control={<Radio style={{ color: color }} />}
        label={
          <AlignCenter>
            <Typography variant="subtitle2">
              {answer}
            </Typography>
          </AlignCenter>
        }
      />
      <Condition condition={showStatistics}>
        <StatisticalBar n={totalCount} np={answerVotes} color={color} />
        <Typography sx={{ fontSize: "small", float: "right", color: color }}>
          {`${answerVotes} votes`}
        </Typography>
      </Condition>
    </Box>
  );
}
