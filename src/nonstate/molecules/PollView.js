import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import { TimeX } from "@nuuuwan/utils-js-dev";

import PollResult from "../../core/PollResult.js";

import PercentageWidget from "../atoms/PercentageWidget.js";
import VoteButton from "../atoms/VoteButton.js";

const STYLE = {
  margin: 2,
  padding: 3,
  maxWidth: 400,
};

export default function PollView({
  poll,
  onClickVote,
  answerToVotes,
  totalVotes,
}) {
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
    <Paper key={"poll-" + poll.pollID} sx={STYLE}>
      <FormControl>
        <Typography variant="subtitle1">{poll.question}</Typography>
        <RadioGroup value={selectedAnswer} onChange={onChange}>
          {poll.answerList.map(function (answer, iAnswer) {
            const np = answerToVotes[answer] ? answerToVotes[answer] : 0;
            return (
              <div key={"poll-answer-" + iAnswer}>
                <FormControlLabel
                  value={answer}
                  control={<Radio />}
                  label={<Typography variant="subtitle2">{answer}</Typography>}
                />
                <PercentageWidget answer={answer} n={totalVotes} np={np} />
              </div>
            );
          })}
        </RadioGroup>
      </FormControl>

      <VoteButton onClick={onClick} />
    </Paper>
  );
}
