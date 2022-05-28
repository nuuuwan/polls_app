import {
  render,
  screen,
  waitFor,
  fireEvent,
  act,
} from "@testing-library/react";

import App from "../../App";

const PARAMS_TIMEOUT = { timeout: 3_000 };
const PARAMS_EVENT = { bubbles: true };

jest.setTimeout(10_000);
jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(() => {});

jest.spyOn(window, "scrollTo").mockImplementation(() => {});

export async function screenFindByText(text) {
  const element = await waitFor(() => screen.findByText(text), PARAMS_TIMEOUT);
  expect(element).toBeInTheDocument();
  return element;
}

export function click(element) {
  expect(element).toBeInTheDocument();
  act(() => {
    fireEvent(element, new MouseEvent("click", PARAMS_EVENT));
  });
}

export async function defaultAppLoad() {
  await act(async () => {
    render(<App />);
  });
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
