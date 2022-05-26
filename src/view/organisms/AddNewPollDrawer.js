import { Component } from "react";

import ID from "../../nonview/base/ID";
import Poll, {
  DEFAULT_QUESTION,
  DEFAULT_ANSWER_LIST,
  DEFAULT_VISIBILITY,
} from "../../nonview/core/Poll";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import AudioX from "../../nonview/core/AudioX";
import AddNewPollDrawerMolecule from "../../view/molecules/AddNewPollDrawerMolecule";

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

    return (
      <AddNewPollDrawerMolecule
        question={question}
        answerList={answerList}
        visibility={visibility}
        isOpen={isOpen}
        onClose={onClose}
        onChangeQuestion={this.onChangeQuestion.bind(this)}
        onChangeAnswerList={this.onChangeAnswerList.bind(this)}
        onChangeVisibility={this.onChangeVisibility.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
      />
    );
  }
}
