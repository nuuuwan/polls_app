import { Component } from "react";
import FormControl from "@mui/material/FormControl";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { TimeX, MathX } from "@nuuuwan/utils-js-dev";

import PollsAppServer from "../../core/PollsAppServer";
import MathXFuture from "../../base/MathXFuture";
import GeoLocationDBX from "../../base/GeoLocationDBX";
import PollResult from "../../core/PollResult";
import VoteButton from "../../nonstate/atoms/VoteButton";
import PollAnswer from "../../nonstate/molecules/PollAnswer";
import PollStatisticsView from "../../nonstate/molecules/PollStatisticsView";

const STYLE = {
  margin: 2,
  padding: 2,
  height: 300,
};

const ANSWER_NONE = "";

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedAnswer: ANSWER_NONE, pollExtended: undefined };
  }

  async componentDidMount() {
    const { pollID } = this.props;
    const pollExtended = await PollsAppServer.getPollExtended(pollID);
    this.setState({ pollExtended });
  }

  setSelectedAnswer(selectedAnswer) {
    this.setState({ selectedAnswer });
  }

  renderInner() {
    const { selectedAnswer, pollExtended } = this.state;
    if (!pollExtended) {
      return <CircularProgress />;
    }

    const { onClickVote, shuffle } = this.props;
    const answerToCount = pollExtended.answerToCount;
    const totalCount = MathX.sum(Object.values(answerToCount));

    const onClick = async function (e) {
      const geoInfo = await await GeoLocationDBX.getInfo();
      const userID = geoInfo.infoHash;
      onClickVote(
        new PollResult(
          pollExtended.pollID,
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
      ? MathXFuture.randomShuffle(pollExtended.answerList)
      : pollExtended.answerList;

    return (
      <div key={"poll-" + pollExtended.pollID}>
        <FormControl>
          <Typography variant="subtitle1">{pollExtended.question}</Typography>
          <RadioGroup value={selectedAnswer} onChange={onChange}>
            {displayAnswerList.map(function (answer, iAnswer) {
              const answerVotes = answerToCount[answer]
                ? answerToCount[answer]
                : 0;
              return (
                <PollAnswer
                  key={"poll-answer-" + iAnswer}
                  answer={answer}
                  answerVotes={answerVotes}
                  totalCount={totalCount}
                />
              );
            })}
          </RadioGroup>
          <PollStatisticsView
            answerList={pollExtended.answerList}
            totalCount={totalCount}
            answerToCount={answerToCount}
          />
        </FormControl>

        <VoteButton
          onClick={onClick}
          disabled={selectedAnswer === ANSWER_NONE}
        />
      </div>
    );
  }

  render() {
    return <Paper sx={STYLE}>{this.renderInner()}</Paper>;
  }
}
