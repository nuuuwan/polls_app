import RadioGroup from "@mui/material/RadioGroup";

import { MathX } from "@nuuuwan/utils-js-dev";
import { ANSWER_NONE } from "../../nonview/core/Poll";
import PollAnswer from "../../view/molecules/PollAnswer";
import ValidationBox from "../../view/molecules/ValidationBox";

export default function PollAnswerGroup({
  pollExtended,
  selectedAnswer,
  hasSubmittedVote,
  setSelectedAnswer,
  onClickVote,
  onChange,
}) {
  const userAnswer = pollExtended.userAnswer;
  const hasUserVote = userAnswer && userAnswer !== ANSWER_NONE;
  const hasSelectedOption = selectedAnswer && selectedAnswer !== ANSWER_NONE;
  const isSelectionUserAnswer =
    hasSelectedOption && selectedAnswer === userAnswer;
  const showStatistics = hasUserVote;
  const totalCount = MathX.sum(Object.values(pollExtended.answerToCount));

  return (
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
    </ValidationBox>
  );
}
