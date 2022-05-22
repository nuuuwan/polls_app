import { Component } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { TimeX, MathX } from "@nuuuwan/utils-js-dev";
import { PollIcon } from "../../constants/Constants.js";
import PollsAppServer from "../../core/PollsAppServer";
import GhostUserX from "../../base/GhostUserX";
import PollResult from "../../core/PollResult";
import VoteButton from "../../nonstate/atoms/VoteButton";
import PollAnswer from "../../nonstate/molecules/PollAnswer";
import PollStatisticsView from "../../nonstate/molecules/PollStatisticsView";
import ValidationBox from "../../nonstate/molecules/ValidationBox";

const STYLE = {
  margin: 2,
  padding: 1,
};

const ANSWER_NONE = "";

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedAnswer: ANSWER_NONE, pollExtended: undefined };
  }

  async reloadData() {
    const { pollID } = this.props;
    const pollExtended = await PollsAppServer.getPollExtended(pollID);
    this.setState({ pollExtended });
  }

  async componentDidMount() {
    await this.reloadData();
  }

  setSelectedAnswer(selectedAnswer) {
    this.setState({ selectedAnswer });
  }

  renderInner() {
    const { selectedAnswer, pollExtended } = this.state;
    if (!pollExtended) {
      return <CircularProgress />;
    }

    const answerToCount = pollExtended.answerToCount;
    const totalCount = MathX.sum(Object.values(answerToCount));

    const onClickVote = async function (e) {
      const geoInfo = await await GhostUserX.getInfo();
      const userID = geoInfo.infoHash;
      const pollResult = new PollResult(
        pollExtended.pollID,
        userID,
        selectedAnswer,
        TimeX.getUnixTime(),
        geoInfo
      );
      await PollsAppServer.addPollResult(pollResult);
      await this.reloadData();
    }.bind(this);

    const onChange = function (e) {
      this.setSelectedAnswer(e.target.value);
    }.bind(this);

    const hasSelectedOption = selectedAnswer !== ANSWER_NONE;

    return (
      <Stack
        key={"poll-" + pollExtended.pollID + answerToCount}
        sx={STYLE}
        spacing={2}
      >
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <PollIcon />
          <Typography variant="subtitle1">{pollExtended.question}</Typography>
        </Stack>

        <ValidationBox
          isValid={hasSelectedOption}
          alertIfValid={
            <>
              Looks good. Now click <strong>Vote</strong> to submit your vote.
              You can vote <strong>any number</strong> of times. Your{" "}
              <strong>most recent</strong> vote will be counted
            </>
          }
          alertIfInvalid={
            <>
              Select <strong>exactly one</strong> answer.
            </>
          }
        >
          <Box sx={{ m: 2 }}>
            <RadioGroup value={selectedAnswer} onChange={onChange}>
              {pollExtended.answerList.map(function (answer, iAnswer) {
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
          </Box>
        </ValidationBox>

        <PollStatisticsView
          answerList={pollExtended.answerList}
          totalCount={totalCount}
          answerToCount={answerToCount}
        />

        <Box display="flex" justifyContent="flex-end">
          <VoteButton onClick={onClickVote} disabled={!hasSelectedOption} />
        </Box>
      </Stack>
    );
  }

  render() {
    return <Paper>{this.renderInner()}</Paper>;
  }
}
