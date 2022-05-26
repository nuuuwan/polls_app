import Poll, { MIN_ANSWER_LIST_LENGTH } from "../../nonview/core/Poll";
import ValidationBox from "../../view/molecules/ValidationBox";
import ListInput from "../../view/molecules/ListInput";

export default function PollAnswerListEditor({
  answerList,
  onChangeAnswerList,
}) {
  return (
    <ValidationBox
      isValid={Poll.isAnswerListValid(answerList)}
      alertIfValid="Looks good. You can add more answers"
      alertIfInvalid={
        <>
          You must specify at least <strong>{MIN_ANSWER_LIST_LENGTH}</strong>{" "}
          answers. Type each answer and then hit <strong>enter</strong>.
        </>
      }
    >
      <ListInput
        required
        label="Answer List"
        placeholder="Add possible answers..."
        value={answerList}
        onChange={onChangeAnswerList}
      />
    </ValidationBox>
  );
}
