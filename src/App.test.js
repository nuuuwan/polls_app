import { screen } from "@testing-library/react";

import {
  screenFindByText,
  click,
  defaultAppLoad,
  clickOnMenu,
} from "./view/tests/Tests";

test("Polls Page", async () => {
  await defaultAppLoad();
});

test("Add New Poll", async () => {
  await defaultAppLoad();
  const button = await screenFindByText("Add New");
  click(button);
  await screenFindByText("Question");
});

test("Help Page", async () => {
  await clickOnMenu("Help & FAQs");
  await screenFindByText("FAQs");
});

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
