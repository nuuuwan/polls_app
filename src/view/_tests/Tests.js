import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";

import { testPollExtended } from "../../nonview/tests/TestData";

import App from "../../App";

const PARAMS_TIMEOUT = { timeout: 3_000 };
const PARAMS_EVENT = { bubbles: true };

jest.setTimeout(10_000);
jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(() => {});

export async function screenFindByText(text) {
  const element = await waitFor(() => screen.findByText(text), PARAMS_TIMEOUT);
  expect(element).toBeInTheDocument();
  return element;
}

export function click(element) {
  expect(element).toBeInDocument();
  act(() => {
    fireEvent(element, new MouseEvent("click", PARAMS_EVENT));
  });
}

export async function defaultAppLoad() {
  await act(async () => {
    render(<App />);
  });
  await screenFindByText("Polls App");
  await screenFindByText(testPollExtended.question);
}

export async function clickOnMenu(buttonLabel) {
  await defaultAppLoad();
  const buttonTop = screen.getByRole("button", {
    name: "CustomAppBarMenu.button",
  });
  click(buttonTop);

  const button = await screenFindByText(buttonLabel);
  click(button);
}
