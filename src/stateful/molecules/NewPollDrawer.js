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
import FormLabel from "@mui/material/FormLabel";

import { PollIcon } from "../../constants/Constants";
import IDXFuture from "../../base/IDXFuture";
import Poll from "../../core/Poll";
import PollsAppServer from "../../core/PollsAppServer";
import ListInput from "../../nonstate/molecules/ListInput";
import AlignCenter from "../../nonstate/atoms/AlignCenter";
import ValidationBox from "../../nonstate/molecules/ValidationBox";
import AudioX from "../../core/AudioX";
import PollVisibilitySelector from "../../nonstate/molecules/PollVisibilitySelector";

const MIN_QUESTION_LENGTH = 10;
const MIN_ANSWER_LIST_LENGTH = 2;

const DEFAULT_QUESTION = "";
const DEFAULT_ANSWER_LIST = [];
const DEFAULT_VISIBILITY = "unlisted";

export default class NewPollDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: DEFAULT_QUESTION,
      answerList: DEFAULT_ANSWER_LIST,
      visibility: DEFAULT_VISIBILITY,
    };
  }

  onChangeQuestion(e) {
    const newQuestion = e.target.value;
    this.setState({ question: newQuestion });
  }

  onChangeAnswerList(newAnswerList) {
    this.setState({ answerList: newAnswerList });
  }

  onChangeVisibility(visibility) {
    this.setState({ visibility });
  }

  async onClickAdd(e) {
    const { question, answerList, visibility } = this.state;
    const { onAddNewPoll } = this.props;

    const pollID = IDXFuture.getRandomID();
    const poll = new Poll(pollID, question.trim(), answerList, visibility);
    await PollsAppServer.addPoll(poll);
    AudioX.playVote();
    onAddNewPoll(pollID);

    this.setState({
      question: DEFAULT_QUESTION,
      answerList: DEFAULT_ANSWER_LIST,
      visibility: DEFAULT_VISIBILITY,
    });
  }

  render() {
    const { question, answerList, visibility } = this.state;
    const { isOpen, onClose } = this.props;
    const isQuestionValid =
      question.length >= MIN_QUESTION_LENGTH &&
      question.trim().slice(-1) === "?";
    const isAnswerListValid = answerList.length >= MIN_ANSWER_LIST_LENGTH;

    const style = {
      m: 1,
      p: 1,
      width: Math.min(450, window.innerWidth * 0.85),
    };

    return (
      <Drawer anchor="right" open={isOpen} onClose={onClose}>
        <Box sx={style}>
          <Stack spacing={3}>
            <AlignCenter>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
              <Typography variant="h6">Add New Poll</Typography>
              <PollIcon />
            </AlignCenter>

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
              <FormLabel>{"Question"}</FormLabel>
              <TextField
                required
                multiline
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

            <PollVisibilitySelector
              visibility={visibility}
              onChange={this.onChangeVisibility.bind(this)}
            />

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
