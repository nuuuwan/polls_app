import { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";

import { TimeX } from "@nuuuwan/utils-js-dev";

import MathXFuture from "../../base/MathXFuture";
import GeoLocationDBX from "../../base/GeoLocationDBX";
import PollResult from "../../core/PollResult";
import VoteButton from "../../nonstate/atoms/VoteButton";
import PollAnswer from "../../nonstate/molecules/PollAnswer";
import PollStatisticsView from "../../nonstate/molecules/PollStatisticsView";

const STYLE = {
  margin: 2,
  padding: 2,
};

const ANSWER_NONE = "";

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedAnswer: ANSWER_NONE };
  }

  async componentDidMount() {}

  setSelectedAnswer(selectedAnswer) {
    this.setState({ selectedAnswer });
  }

  render() {
    const { poll, onClickVote, answerToVotes, totalVotes, shuffle } =
      this.props;
    const { selectedAnswer } = this.state;

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
      this.setSelectedAnswer(e.target.value);
    }.bind(this);

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

        <VoteButton
          onClick={onClick}
          disabled={selectedAnswer === ANSWER_NONE}
        />
      </Paper>
    );
  }
}
