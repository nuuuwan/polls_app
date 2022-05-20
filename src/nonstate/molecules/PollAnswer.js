import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import PercentageWidget from "../atoms/PercentageWidget.js";

export default function PollAnswer({ answer, totalVotes, answerVotes }) {
  return (
    <div>
      <FormControlLabel
        value={answer}
        control={<Radio />}
        label={<Typography variant="subtitle2">{answer}</Typography>}
      />
      <PercentageWidget n={totalVotes} np={answerVotes} />
    </div>
  );
}
