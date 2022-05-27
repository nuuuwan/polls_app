import { render } from "@testing-library/react";

import AddNewPollDrawer from "./AddNewPollDrawer";
import { init } from "../../view/_tests/MockExternals";
import { screenFindByText } from "../../view/_tests/Tests";

init();

test("AddNewPollDrawer", async () => {
  render(<AddNewPollDrawer isOpen={true} />);

  await screenFindByText("Question");
  await screenFindByText("Answer List");
  await screenFindByText("Visibility");
  await screenFindByText("Public Poll");
  await screenFindByText("Unlisted Poll");
});
