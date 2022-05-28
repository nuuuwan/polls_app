import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import VoteButton from "../../view/atoms/VoteButton";
import PollAnswerGroup from "../../view/molecules/PollAnswerGroup";
import PollTitle from "../../view/molecules/PollTitle";
import ValidationBox from "../../view/molecules/ValidationBox";

const ANSWER_NONE = "";

export default function PollViewMolecule({
  pollExtended,
  selectedAnswer,
  hasSubmittedVote,
  setSelectedAnswer,
  onClickVote,
}) {
  const onClickVoteInner = async function (e) {
    onClickVote();
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
