import { Component } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import { PollIcon } from "../../view/_constants/CommonIcons";
import ID from "../../nonview/base/ID";
import Poll, {
  MIN_ANSWER_LIST_LENGTH,
  DEFAULT_QUESTION,
  DEFAULT_ANSWER_LIST,
  DEFAULT_VISIBILITY,
} from "../../nonview/core/Poll";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import ListInput from "../../view/molecules/ListInput";
import AlignCenter from "../../view/atoms/AlignCenter";
import ValidationBox from "../../view/molecules/ValidationBox";
import AudioX from "../../nonview/core/AudioX";
import PollVisibilitySelector from "../../view/molecules/PollVisibilitySelector";
import PollQuestionEditor from "../../view/molecules/PollQuestionEditor";

export default class AddNewPollDrawer extends Component {
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

    const pollID = ID.getRandomID();
    const poll = new Poll(pollID, question.trim(), answerList, visibility);
    await PollsAppServer.addPoll(poll);
    await AudioX.playVote();
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

            <PollQuestionEditor
              question={question}
              onChangeQuestion={this.onChangeQuestion.bind(this)}
            />

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
                disabled={
                  !(Poll.isQuestionValid(question) && isAnswerListValid)
                }
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
