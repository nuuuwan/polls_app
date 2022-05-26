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
  DEFAULT_QUESTION,
  DEFAULT_ANSWER_LIST,
  DEFAULT_VISIBILITY,
} from "../../nonview/core/Poll";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import AlignCenter from "../../view/atoms/AlignCenter";
import AudioX from "../../nonview/core/AudioX";
import PollVisibilitySelector from "../../view/molecules/PollVisibilitySelector";
import PollQuestionEditor from "../../view/molecules/PollQuestionEditor";
import PollAnswerListEditor from "../../view/molecules/PollAnswerListEditor";

const DEFAULT_STATE = {
  question: DEFAULT_QUESTION,
  answerList: DEFAULT_ANSWER_LIST,
  visibility: DEFAULT_VISIBILITY,
};

export default class AddNewPollDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
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
    this.setState(DEFAULT_STATE);
  }

  render() {
    const { question, answerList, visibility } = this.state;
    const { isOpen, onClose } = this.props;

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

            <PollAnswerListEditor
              answerList={answerList}
              onChangeAnswerList={this.onChangeAnswerList.bind(this)}
            />

            <PollVisibilitySelector
              visibility={visibility}
              onChange={this.onChangeVisibility.bind(this)}
            />

            <Box display="flex" justifyContent="flex-end">
              <Button
                onClick={this.onClickAdd.bind(this)}
                disabled={
                  !(
                    Poll.isQuestionValid(question) &&
                    Poll.isAnswerListValid(answerList)
                  )
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
