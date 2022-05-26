import { Component } from "react";

import Poll from "../../nonview/core/Poll";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import AudioX from "../../nonview/core/AudioX";
import AddNewPollDrawerMolecule from "../../view/molecules/AddNewPollDrawerMolecule";

export default class AddNewPollDrawer extends Component {
  constructor(props) {
    super(props);
    const poll = Poll.constructEmptyPoll();
    this.state = { poll };
  }

  onChangePoll(poll) {
    this.setState({ poll });
  }

  async onClickAdd(e) {
    const { poll } = this.state;
    const { onAddNewPoll } = this.props;
    await PollsAppServer.addPoll(poll);
    await AudioX.playVote();
    onAddNewPoll(poll.pollID);
    this.setState({ poll: Poll.constructEmptyPoll() });
  }

  render() {
    const { poll } = this.state;
    const { isOpen, onClose } = this.props;

    return (
      <AddNewPollDrawerMolecule
        poll={poll}
        isOpen={isOpen}
        onClose={onClose}
        onChangePoll={this.onChangePoll.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
      />
    );
  }
}
