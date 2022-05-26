import { MIN_ANSWER_LIST_LENGTH } from "../../nonview/core/Poll";
import ValidationBox from "../../view/molecules/ValidationBox";
import ListInput from "../../view/molecules/ListInput";

export default function PollAnswerListEditor({ poll, onChangePoll }) {
  const onChangeAnswerList = function (newAnswerList) {
    poll.answerList = newAnswerList;
    onChangePoll(poll);
  };

  return (
    <ValidationBox
      isValid={poll.isAnswerListValid}
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
        value={poll.answerList}
        onChange={onChangeAnswerList}
      />
    </ValidationBox>
  );
}
