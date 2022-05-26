import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import RadioGroup from "@mui/material/RadioGroup";

import { MathX } from "@nuuuwan/utils-js-dev";
import VoteButton from "../../view/atoms/VoteButton";
import PollAnswer from "../../view/molecules/PollAnswer";
import ValidationBox from "../../view/molecules/ValidationBox";
import PollTitle from "../../view/molecules/PollTitle";

const STYLE = {
  margin: 0,
  padding: 2,
};

const ANSWER_NONE = "";

export default function PollViewMolecule({
  pollExtended,
  selectedAnswer,
  hasSubmittedVote,
  setSelectedAnswer,
  onClickVote,
}) {
  const onClickVoteInner = async function (e) {
    onClickVote(pollExtended);
  };

  const onChange = function (e) {
    setSelectedAnswer(e.target.value);
  };

  const userAnswer = pollExtended.userAnswer;
  const hasUserVote = userAnswer && userAnswer !== ANSWER_NONE;
  const hasSelectedOption = selectedAnswer && selectedAnswer !== ANSWER_NONE;
  const isSelectionUserAnswer =
    hasSelectedOption && selectedAnswer === userAnswer;
  const isVoteButtonDisabled = !hasSelectedOption || isSelectionUserAnswer;
  const showStatistics = hasUserVote;
  const totalCount = MathX.sum(Object.values(pollExtended.answerToCount));

  return (
    <Stack
      key={"poll-" + pollExtended.pollID + pollExtended.answerToCount}
      sx={STYLE}
      spacing={2}
    >
      <PollTitle pollExtended={pollExtended} />

      <ValidationBox
        isValid={hasSelectedOption && !isSelectionUserAnswer}
        alertIfValid={
          <>
            Looks good. Now, click <strong>Vote</strong> to submit your vote.
          </>
        }
        alertIfInvalid={
          isSelectionUserAnswer ? (
            ""
          ) : (
            <>
              Select <strong>one</strong> answer.
            </>
          )
        }
      >
        <Box sx={{ m: 0, marginLeft: 1 }}>
          <RadioGroup value={selectedAnswer} onChange={onChange}>
            {pollExtended.answerList.map(function (answer, iAnswer) {
              const answerVotes = pollExtended.answerToCount[answer]
                ? pollExtended.answerToCount[answer]
                : 0;
              return (
                <PollAnswer
                  key={"poll-answer-" + iAnswer}
                  answer={answer}
                  answerVotes={answerVotes}
                  totalCount={totalCount}
                  showStatistics={showStatistics}
                  userAnswer={userAnswer}
                />
              );
            })}
          </RadioGroup>
        </Box>
      </ValidationBox>

      <ValidationBox
        isValid={hasSubmittedVote}
        alertIfValid={
          <>
            Thanks for voting! You can change your vote by selecting a different
            option. Polls App will count your <strong>most recent</strong> vote.
          </>
        }
        alertIfInvalid={""}
      >
        <Box display="flex" justifyContent="flex-end">
          <VoteButton
            onClick={onClickVoteInner}
            disabled={isVoteButtonDisabled}
          />
        </Box>
      </ValidationBox>
    </Stack>
  );
}
