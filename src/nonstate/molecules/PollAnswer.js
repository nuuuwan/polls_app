import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTheme } from "@mui/material/styles";

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
  const color = useTheme().palette.primary.main;

  return (
    <>
      <FormControlLabel
        value={answer}
        control={<Radio />}
        label={
          <AlignCenter>
            <Typography variant="subtitle2">{answer}</Typography>
            <Condition condition={isUserAnswer}>
              <CheckCircleIcon sx={{ color: color }} />
              <Typography style={{ fontSize: "small", color: color }}>
                Your current vote
              </Typography>
            </Condition>
          </AlignCenter>
        }
      />
      <Condition condition={showStatistics}>
        <PercentageWidget n={totalCount} np={answerVotes} />
      </Condition>
    </>
  );
}
