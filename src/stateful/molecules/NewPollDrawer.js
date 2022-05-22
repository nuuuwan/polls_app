import { Component } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import TextField from "@mui/material/TextField";

import IDXFuture from "../../base/IDXFuture";
import Poll from "../../core/Poll";
import PollsAppServer from "../../core/PollsAppServer";
import ListInput from "../../nonstate/molecules/ListInput";

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
    const { onClose } = this.props;

    const pollID = IDXFuture.getRandomID();
    const poll = new Poll(pollID, question, answerList);
    await PollsAppServer.addPoll(poll);
    onClose();
  }

  disableAdd() {
    const { question, answerList } = this.state;
    return question.length < 10 || answerList.length < 2;
  }

  render() {
    const { question, answerList } = this.state;
    const { isOpen, onClose } = this.props;
    return (
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box sx={{ m: 1, p: 3 }}>
          <Stack spacing={2}>
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
              placeholder="Enter the list of possible answers"
              value={answerList}
              onChange={this.onChangeAnswerList.bind(this)}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={this.onClickAdd.bind(this)}
                disabled={this.disableAdd()}
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
