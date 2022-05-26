import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";

import Poll, { MIN_QUESTION_LENGTH } from "../../nonview/core/Poll";
import ValidationBox from "../../view/molecules/ValidationBox";

export default function PollQuestionEditor({ question, onChangeQuestion }) {
  return (
    <ValidationBox
      isValid={Poll.isQuestionValid(question)}
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
        value={question}
        placeholder="Ask a question..."
        onChange={onChangeQuestion}
      />
    </ValidationBox>
  );
}
