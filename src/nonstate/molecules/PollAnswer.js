import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AlignCenter from "../../nonstate/atoms/AlignCenter";
import Condition from "../atoms/Condition";
import PercentageWidget from "../atoms/PercentageWidget";

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
            <Typography variant="subtitle2">{answer}</Typography>
            <Condition condition={isUserAnswer}>
              <CheckCircleIcon sx={{ color: color }} />
              <Typography style={{ fontSize: "small", color: color }}>
                Your vote
              </Typography>
            </Condition>
          </AlignCenter>
        }
      />
      <Condition condition={showStatistics}>
        <PercentageWidget n={totalCount} np={answerVotes} color={color} />
      </Condition>
    </Box>
  );
}
