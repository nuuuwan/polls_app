import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import App from "./App";

jest.setTimeout(120_000);
const PARAMS_TIMEOUT = { timeout: 20_000 };

jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(() => {});

async function defaultPageLoad() {
  render(<App />);
  await waitFor(() => screen.findByText("Polls App"), PARAMS_TIMEOUT);
  expect(screen.getByText("Polls App")).toBeInTheDocument();
}

async function clickOnMenu() {
  const button = screen.getByRole("button", {
    name: "CustomAppBarMenu.button",
  });
  fireEvent(button, new MouseEvent("click", { bubbles: true }));
}

test("Polls Page", async () => {
  await defaultPageLoad();
});

test("Add New Poll", async () => {
  await defaultPageLoad();

  await waitFor(() => screen.findByText("Add New"), PARAMS_TIMEOUT);
  const button = screen.getByText("Add New");
  fireEvent(button, new MouseEvent("click", { bubbles: true }));

  // Validate Add New Poll Drawer
  expect(screen.getByText("Question")).toBeInTheDocument();
  await waitFor(() => screen.findByText("Question"), PARAMS_TIMEOUT);
  expect(screen.getByText("Question")).toBeInTheDocument();
});

test("Help Page", async () => {
  await defaultPageLoad();
  await clickOnMenu();

  // Click on Help
  await waitFor(() => screen.findByText("Help & FAQs"), PARAMS_TIMEOUT);
  const buttonHelp = screen.getByText("Help & FAQs");
  fireEvent(buttonHelp, new MouseEvent("click", { bubbles: true }));

  // Validate HelpPage
  await waitFor(() => screen.findByText("FAQs"), PARAMS_TIMEOUT);
  expect(screen.getByText("FAQs")).toBeInTheDocument();
});

test("User Page", async () => {
  await defaultPageLoad();
  await clickOnMenu();

  // Click on User
  await waitFor(() => screen.findByText("User"), PARAMS_TIMEOUT);
  const buttonHelp = screen.getByText("User");
  fireEvent(buttonHelp, new MouseEvent("click", { bubbles: true }));

  // Validate UserPage
  await waitFor(() => screen.findByText("UserID"), PARAMS_TIMEOUT);
  expect(screen.getByText("UserID")).toBeInTheDocument();
});
