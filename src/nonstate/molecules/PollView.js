import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HowToVoteIcon from "@mui/icons-material/HowToVote";
const STYLE = {
  margin: 2,
  padding: 3,
  maxWidth: 500,
};

const STYLE_BUTTON = {
  maxWidth: 150,
};

export default function PollView({ poll }) {
  return (
    <Paper sx={STYLE}>
      <FormControl>
        <Typography variant="h6">{poll.question}</Typography>
        <RadioGroup>
          {Object.entries(poll.answerValueToLabel).map(function (
            [answerValue, answerLabel],
            iAnswer
          ) {
            return (
              <FormControlLabel
                key={"poll-answer-" + iAnswer}
                value={answerValue}
                control={<Radio />}
                label={answerLabel}
              />
            );
          })}
        </RadioGroup>
      </FormControl>

      <Stack direction="row" justifyContent="right" spacing={1}>
        <Button
          sx={STYLE_BUTTON}
          startIcon={<HowToVoteIcon />}
          variant="contained"
        >
          Vote
        </Button>
      </Stack>
    </Paper>
  );
}
