import { Component } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { PollIcon } from "../../constants/Constants.js";
import IDXFuture from "../../base/IDXFuture";
import Poll from "../../core/Poll";
import PollsAppServer from "../../core/PollsAppServer";
import ListInput from "../../nonstate/molecules/ListInput";
import ValidationBox from "../../nonstate/molecules/ValidationBox";

const MIN_QUESTION_LENGTH = 10;
const MIN_ANSWER_LIST_LENGTH = 2;

export default class NewPollDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = { question: "", answerList: [] };
  }

  onChangeQuestion(e) {
    const newQuestion = e.target.value;
    this.setState({ question: newQuestion });
  }

  onChangeAnswerList(newAnswerList) {
    this.setState({ answerList: newAnswerList });
  }

  async onClickAdd(e) {
    const { question, answerList } = this.state;
    const { onAddNewPoll } = this.props;

    const pollID = IDXFuture.getRandomID();
    const poll = new Poll(pollID, question, answerList);
    await PollsAppServer.addPoll(poll);
    onAddNewPoll(pollID);

    this.setState({
      question: "",
      answerList: [],
    });
  }

  render() {
    const { question, answerList } = this.state;
    const { isOpen, onClose } = this.props;
    const isQuestionValid =
      question.length >= MIN_QUESTION_LENGTH && question.slice(-1) === "?";
    const isAnswerListValid = answerList.length >= MIN_ANSWER_LIST_LENGTH;

    return (
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box sx={{ m: 1, p: 3, width: 300 }}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
              <Typography variant="h6">Add New Poll</Typography>
              <PollIcon />
            </Stack>

            <ValidationBox
              isValid={isQuestionValid}
              alertIfValid="Looks good."
              alertIfInvalid={
                <>
                  A question must be at least{" "}
                  <strong>{MIN_QUESTION_LENGTH}</strong> characters, and should
                  end in a question mark.
                </>
              }
            >
              <TextField
                required
                multiline
                label="Poll Question"
                value={question}
                placeholder="Ask a question..."
                onChange={this.onChangeQuestion.bind(this)}
              />
            </ValidationBox>

            <ValidationBox
              isValid={isAnswerListValid}
              alertIfValid="Looks good. You can add more answers"
              alertIfInvalid={
                <>
                  You must specify at least{" "}
                  <strong>{MIN_ANSWER_LIST_LENGTH}</strong> answers. Type each
                  answer and then hit <strong>enter</strong>.
                </>
              }
            >
              <ListInput
                required
                label="Answer List"
                placeholder="Add possible answers..."
                value={answerList}
                onChange={this.onChangeAnswerList.bind(this)}
              />
            </ValidationBox>
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={this.onClickAdd.bind(this)}
                disabled={!(isQuestionValid && isAnswerListValid)}
                variant="contained"
                startIcon={<AddIcon />}
              >
                Add New Poll
              </Button>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    );
  }
}
