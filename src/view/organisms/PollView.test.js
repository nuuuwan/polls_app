import {render,  act} from "@testing-library/react";
import {testGeoLocationInfo, testPollExtended} from "../../nonview/tests/TestData";
import { init } from "../../view/_tests/MockExternals";
import { screenFindByText } from "../../view/_tests/Tests";

import PollView from "./PollView"

init();

test("PollView", async () => {
  await act(async () => {
    render(<PollView
      key={undefined}
      pollID={testPollExtended.pollID}
      onSelectPoll={undefined}
    />);
  });
  await screenFindByText(testPollExtended.question);
  await screenFindByText(testPollExtended.visibility);
  await screenFindByText('Too close to call');
  await screenFindByText(testPollExtended.totalCount + ' votes');
  await screenFindByText('You voted "' + testPollExtended.userAnswer + '"');

  for (let answer of testPollExtended.answerList) {
    await screenFindByText(answer);
  }
});
