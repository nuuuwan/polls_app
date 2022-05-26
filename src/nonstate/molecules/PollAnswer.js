import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import AlignCenter from "../../nonstate/atoms/AlignCenter";
import Condition from "../atoms/Condition";
import StatisticalBar from "../atoms/StatisticalBar";

import Emoji from "../../nonstate/atoms/Emoji";

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
              <Emoji text={answer} />
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
