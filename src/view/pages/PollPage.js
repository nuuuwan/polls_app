import { Component } from "react";

import Box from "@mui/material/Box";

import { TimeX } from "@nuuuwan/utils-js-dev";

import PollBottomNavigation from "../../view/organisms/PollBottomNavigation";
import PollDirectory from "../../view/organisms/PollDirectory";
import PollView from "../../view/organisms/PollView";

export default class PollPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLastUpdated: 0,
    };
  }

  async componentDidMount() {
    await this.refresh();
  }

  async refresh() {
    this.setState({
      timeLastUpdated: TimeX.getUnixTime(),
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  render() {
    const { timeLastUpdated } = this.state;
    return (
      <div>
        <Box sx={{ marginBotton: 1, maxWidth: "100%" }}>
          <PollView
            key={"poll-view-" + timeLastUpdated}
            refresh={this.refresh.bind(this)}
          />
          <PollDirectory
            key={"poll-directory-" + timeLastUpdated}
            refresh={this.refresh.bind(this)}
          />
        </Box>

        <PollBottomNavigation refresh={this.refresh.bind(this)} />
      </div>
    );
  }
}
