import { render, screen, waitFor, fireEvent } from "@testing-library/react";

import App from "../../App";

const PARAMS_TIMEOUT = { timeout: 20_000 };
const PARAMS_EVENT = { bubbles: true };

jest.setTimeout(120_000);
jest
  .spyOn(window.HTMLMediaElement.prototype, "play")
  .mockImplementation(() => {});

export async function screenFindByText(text) {
  return await waitFor(() => screen.findByText(text), PARAMS_TIMEOUT);
}

export function click(element) {
  fireEvent(element, new MouseEvent("click", PARAMS_EVENT));
}

export async function defaultAppLoad() {
  render(<App />);
  await screenFindByText("Polls App");
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
