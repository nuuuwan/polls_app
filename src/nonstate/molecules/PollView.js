import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import { TimeX } from "@nuuuwan/utils-js-dev";

import MathXFuture from "../../base/MathXFuture";
import GeoLocationDBX from "../../base/GeoLocationDBX";
import PollResult from "../../core/PollResult";
import PollAnswer from "./PollAnswer";
import VoteButton from "../atoms/VoteButton";
import PollStatisticsView from "./PollStatisticsView";

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
  shuffle,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(poll.defaultAnswer);

  const onClick = async function (e) {
    const geoInfo = await await GeoLocationDBX.getInfo();
    const userID = geoInfo.infoHash;
    onClickVote(
      new PollResult(
        poll.pollID,
        userID,
        selectedAnswer,
        TimeX.getUnixTime(),
        geoInfo
      )
    );
  };

  const onChange = function (e) {
    setSelectedAnswer(e.target.value);
  };

  const displayAnswerList = shuffle
    ? MathXFuture.randomShuffle(poll.answerList)
    : poll.answerList;

  return (
    <Paper key={"poll-" + poll.pollID} sx={STYLE}>
      <FormControl>
        <Typography variant="subtitle1">{poll.question}</Typography>
        <RadioGroup value={selectedAnswer} onChange={onChange}>
          {displayAnswerList.map(function (answer, iAnswer) {
            const answerVotes = answerToVotes[answer]
              ? answerToVotes[answer]
              : 0;
            return (
              <PollAnswer
                key={"poll-answer-" + iAnswer}
                answer={answer}
                answerVotes={answerVotes}
                totalVotes={totalVotes}
              />
            );
          })}
        </RadioGroup>
        <PollStatisticsView
          answerList={poll.answerList}
          totalVotes={totalVotes}
          answerToVotes={answerToVotes}
        />
      </FormControl>

      <VoteButton onClick={onClick} />
    </Paper>
  );
}
