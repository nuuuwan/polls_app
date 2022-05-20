import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

import PercentageWidget from "../atoms/PercentageWidget.js";

const STYLE = {
  marginBottom: "5%",
  paddingBottom: "5%",
  borderBottom: "1px solid #f0f0f0",
};

export default function PollAnswer({ answer, totalVotes, answerVotes }) {
  return (
    <div style={STYLE}>
      <FormControlLabel
        value={answer}
        control={<Radio />}
        label={<Typography variant="subtitle2">{answer}</Typography>}
      />
      <PercentageWidget n={totalVotes} np={answerVotes} />
    </div>
  );
}
