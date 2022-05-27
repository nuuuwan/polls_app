import { render } from "@testing-library/react";

import { testPollExtended } from "../../nonview/tests/TestData";

import PollView from "./PollView";
import { init } from "../../view/_tests/MockExternals";
import { screenFindByText } from "../../view/_tests/Tests";

init();

test("PollView", async () => {
  render(
    <PollView
      key={undefined}
      pollID={testPollExtended.pollID}
      onSelectPoll={undefined}
    />
  );

  await screenFindByText(testPollExtended.question);
  await screenFindByText(testPollExtended.totalCount + " votes");
  await screenFindByText(testPollExtended.visibility);
  await screenFindByText('You voted "' + testPollExtended.userAnswer + '"');

  await screenFindByText('"Yes" leads');

  for (let answer of testPollExtended.answerList) {
    await screenFindByText(answer);
  }

  for (let count of Object.values(testPollExtended.answerToCount)) {
    await screenFindByText(count + " votes");
  }
});
