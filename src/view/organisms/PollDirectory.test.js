import { render } from "@testing-library/react";

import { testPollExtended } from "../../nonview/tests/TestData";

import PollDirectory from "./PollDirectory";
import { init } from "../../view/_tests/MockExternals";
import { screenFindByText } from "../../view/_tests/Tests";

init();

test("PollView", async () => {
  render(<PollDirectory />);

  await screenFindByText(testPollExtended.question);
  await screenFindByText(testPollExtended.totalCount + " votes");
  await screenFindByText(testPollExtended.visibility);
  await screenFindByText('You voted "' + testPollExtended.userAnswer + '"');
});
