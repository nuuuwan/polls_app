import { screen } from "@testing-library/react";
import { init } from "./view/_tests/MockExternals";
import {
  screenFindByText,
  click,
  defaultAppLoad,
  clickOnMenu,
} from "./view/_tests/Tests";

init();

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
