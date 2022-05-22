import { Component } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";

import IDXFuture from "../../base/IDXFuture";
import Poll from "../../core/Poll";
import PollsAppServer from "../../core/PollsAppServer";
import ListInput from "../../nonstate/molecules/ListInput";

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

  disableAdd() {
    const { question, answerList } = this.state;
    return (
      question.length < MIN_QUESTION_LENGTH ||
      answerList.length < MIN_ANSWER_LIST_LENGTH
    );
  }

  render() {
    const { question, answerList } = this.state;
    const { isOpen, onClose } = this.props;
    const disableAdd = this.disableAdd();
    return (
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box sx={{ m: 1, p: 3, width: 300 }}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="flex-end">
              <IconButton>
                <CloseIcon onClick={onClose} />
              </IconButton>
            </Box>

            <Typography variant="h6">Add New Poll</Typography>
            <TextField
              required
              multiline
              label="Poll Question"
              value={question}
              placeholder="Ask a question..."
              onChange={this.onChangeQuestion.bind(this)}
            />
            <ListInput
              required
              label="Answer List"
              placeholder="Add possible answers..."
              value={answerList}
              onChange={this.onChangeAnswerList.bind(this)}
            />
            <Alert severity={disableAdd ? "error" : "success"}>
              The Question must be at least {MIN_QUESTION_LENGTH} characters
              long. You must specify at least {MIN_ANSWER_LIST_LENGTH} answers.
            </Alert>
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={this.onClickAdd.bind(this)}
                disabled={disableAdd}
              >
                Add
              </Button>
            </Box>
          </Stack>
        </Box>
      </Drawer>
    );
  }
}
