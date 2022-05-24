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

const URL_AUDIO_BASE = "https://raw.githubusercontent.com"
  + "/nuuuwan/polls_app/main/public";
const AUDIO_CLICK = URL_AUDIO_BASE + "/tabla-click.mp3";
const AUDIO_VOTE = URL_AUDIO_BASE + "/tabla-vote.mp3";

export default class PollView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedAnswer: ANSWER_NONE,
      pollExtended: undefined,
      hasSubmittedVote: false,
    };

    this.audio = {
      click: new Audio(AUDIO_CLICK),
      vote: new Audio(AUDIO_VOTE),
    }
  }

  async reloadData(hasSubmittedVote) {
    const { pollID } = this.props;
    const geoInfo = await await GhostUserX.getInfo();
    const userID = geoInfo.infoHash;
    const pollExtended = await PollsAppServer.getPollExtended(pollID, userID);
    const userAnswer = pollExtended.userAnswer;
    this.setState({
      pollExtended,
      selectedAnswer: userAnswer,
      hasSubmittedVote,
    });
  }

  async componentDidMount() {
    await this.reloadData(false);
  }

  setSelectedAnswer(selectedAnswer) {
    this.audio.click.play();
    this.setState({ selectedAnswer, hasSubmittedVote: false });
  }

  renderInner() {
    const { selectedAnswer, pollExtended, hasSubmittedVote } = this.state;
    if (!pollExtended) {
      return <CircularProgress />;
    }

    const answerToCount = pollExtended.answerToCount;
    const totalCount = MathX.sum(Object.values(answerToCount));

    const onClickVote = async function (e) {
      this.audio.vote.play();
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
      await this.reloadData(true);
    }.bind(this);

    const onChange = function (e) {
      this.setSelectedAnswer(e.target.value);
    }.bind(this);

    const userAnswer = pollExtended.userAnswer;
    const hasSelectedOption = selectedAnswer !== ANSWER_NONE;
    const isSelectionUserAnswer = selectedAnswer === userAnswer;
    const isVoteButtonDisabled = !hasSelectedOption || isSelectionUserAnswer;

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
          isValid={hasSelectedOption && !isSelectionUserAnswer}
          alertIfValid={
            <>
              Looks good. Now, click <strong>Vote</strong> to submit your vote.
            </>
          }
          alertIfInvalid={
            isSelectionUserAnswer ? (
              <>
                You have voted <strong>"{selectedAnswer}"</strong> in this poll.
                You can change your vote by selecting a different option. Polls
                App will count your <strong>most recent</strong> vote.
              </>
            ) : (
              <>
                Select <strong>one</strong> answer.
              </>
            )
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
                    showStatistics={true}
                    userAnswer={userAnswer}
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

        <ValidationBox
          isValid={hasSubmittedVote}
          alertIfValid={"Thanks for voting!"}
          alertIfInvalid={""}
        >
          <Box display="flex" justifyContent="flex-end">
            <VoteButton onClick={onClickVote} disabled={isVoteButtonDisabled} />
          </Box>
        </ValidationBox>
      </Stack>
    );
  }

  render() {
    return <Paper>{this.renderInner()}</Paper>;
  }
}
