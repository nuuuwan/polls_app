import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import VoteButton from "../../view/atoms/VoteButton";
import ValidationBox from "../../view/molecules/ValidationBox";
import PollTitle from "../../view/molecules/PollTitle";
import PollAnswerGroup from "../../view/molecules/PollAnswerGroup";

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
  const hasSelectedOption = selectedAnswer && selectedAnswer !== ANSWER_NONE;
  const isSelectionUserAnswer =
    hasSelectedOption && selectedAnswer === userAnswer;
  const isVoteButtonDisabled = !hasSelectedOption || isSelectionUserAnswer;

  return (
    <Stack
      key={"poll-" + pollExtended.pollID + pollExtended.answerToCount}
      sx={STYLE}
      spacing={2}
    >
      <PollTitle pollExtended={pollExtended} />

      <PollAnswerGroup
        pollExtended={pollExtended}
        selectedAnswer={selectedAnswer}
        hasSubmittedVote={hasSubmittedVote}
        setSelectedAnswer={setSelectedAnswer}
        onClickVoteInner={onClickVoteInner}
        onChange={onChange}
      />

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
