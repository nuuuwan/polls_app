import { useState } from "react";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import HowToVoteIcon from "@mui/icons-material/HowToVote";

import { TimeX } from "@nuuuwan/utils-js-dev";

import PollResult from "../../core/PollResult.js";

const STYLE = {
  margin: 2,
  padding: 3,
  maxWidth: 500,
};

const STYLE_BUTTON = {
  maxWidth: 150,
};

export default function PollView({ poll, onClickVote }) {
  const [selectedAnswer, setSelectedAnswer] = useState(poll.defaultAnswer);

  const onClick = function (e) {
    onClickVote(
      new PollResult(
        poll.pollID,
        "anonymous",
        selectedAnswer,
        TimeX.getUnixTime()
      )
    );
  };

  const onChange = function (e) {
    setSelectedAnswer(e.target.value);
  };

  return (
    <Paper sx={STYLE}>
      <FormControl>
        <Typography variant="h6">{poll.question}</Typography>
        <RadioGroup value={selectedAnswer} onChange={onChange}>
          {poll.answerList.map(function (answer, iAnswer) {
            return (
              <FormControlLabel
                key={"poll-answer-" + iAnswer}
                value={answer}
                control={<Radio />}
                label={answer}
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
          onClick={onClick}
        >
          Vote
        </Button>
      </Stack>
    </Paper>
  );
}
