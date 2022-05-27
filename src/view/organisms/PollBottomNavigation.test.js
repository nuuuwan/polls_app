import { render } from "@testing-library/react";

import PollBottomNavigation from "./PollBottomNavigation";
import { init } from "../../view/_tests/MockExternals";
import { screenFindByText } from "../../view/_tests/Tests";

init();

test("PollBottomNavigation", async () => {
  render(<PollBottomNavigation />);

  for (let buttonLabel of ["Copy", "Share", "Add New", "Random"]) {
    await screenFindByText(buttonLabel);
  }
});
