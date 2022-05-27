import { screen } from "@testing-library/react";

import {
  screenFindByText,
  click,
  defaultAppLoad,
  clickOnMenu,
} from "./view/tests/Tests";

test("User Page", async () => {
  await clickOnMenu("User");
  await screenFindByText("UserID");
});

test("User Avatar Button", async () => {
  await defaultAppLoad();
  const buttonTop = screen.getByRole("button", {
    name: "CustomAppBar.avatar.button",
  });
  click(buttonTop);
  await screenFindByText("UserID");
});
