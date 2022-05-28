import { Component } from "react";

import AudioX from "../../nonview/core/AudioX";
import Poll from "../../nonview/core/Poll";
import PollsAppServer from "../../nonview/core/PollsAppServer";
import URLContext from "../../nonview/core/URLContext";

import AddNewPollDrawerMolecule from "../../view/molecules/AddNewPollDrawerMolecule";
import PollPage from "../../view/pages/PollPage";

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
    await PollsAppServer.addPoll(poll);
    this.setState({ poll: Poll.constructEmptyPoll() });
    URLContext.setContext({ Page: PollPage, pollID: poll.pollID });
    await this.props.refresh();
    await this.props.onClose();
    await AudioX.playVote();
  }

  render() {
    return (
      <AddNewPollDrawerMolecule
        poll={this.state.poll}
        isOpen={this.props.isOpen}
        onChangePoll={this.onChangePoll.bind(this)}
        onClickAdd={this.onClickAdd.bind(this)}
        onClose={this.props.onClose}
      />
    );
  }
}
