import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import Condition from "./Condition";
import PercentageWidget from "../atoms/PercentageWidget";

export default function PollAnswer({
  answer,
  totalCount,
  answerVotes,
  showStatistics,
}) {
  return (
    <>
      <FormControlLabel
        value={answer}
        control={<Radio />}
        label={<Typography variant="subtitle2">{answer}</Typography>}
      />
      <Condition condition={showStatistics}>
        <PercentageWidget n={totalCount} np={answerVotes} />
      </Condition>
    </>
  );
}
