import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import { MIN_QUESTION_LENGTH } from "../../nonview/core/Poll";
import ValidationBox from "../../view/molecules/ValidationBox";

export default function PollQuestionEditor({ poll, onChangePoll }) {
  const onChangeQuestion = function (e) {
    const newQuestion = e.target.value;
    poll.question = newQuestion;
    onChangePoll(poll);
  };
  return (
    <ValidationBox
      isValid={poll.isQuestionValid}
      alertIfValid="Looks good."
      alertIfInvalid={
        <>
          A question must be at least <strong>{MIN_QUESTION_LENGTH}</strong>{" "}
          characters, and should end in a question mark.
        </>
      }
    >
      <FormLabel>{"Question"}</FormLabel>
      <TextField
        required
        multiline
        value={poll.question}
        placeholder="Ask a question..."
        onChange={onChangeQuestion}
      />
    </ValidationBox>
  );
}
