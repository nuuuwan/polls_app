import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
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
  return (
    <>
      <FormControlLabel
        value={answer}
        control={<Radio />}
        label={
          <AlignCenter>
            <Typography variant="subtitle2">{answer}</Typography>
            <Condition condition={isUserAnswer}>
              <CheckCircleIcon sx={{ color: "#1976D2" }} />
              <Typography style={{ fontSize: "small", color: "#1976D2" }}>
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
