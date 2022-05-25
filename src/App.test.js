import { render, screen } from "@testing-library/react";
import App from "./App";

const TIMEOUT = 60_000;
const PARAMS = { timeout: TIMEOUT };

test("Polls Page", async () => {
  jest.setTimeout(TIMEOUT);
  render(<App />);

  const appBarTitle = await screen.findByText("Polls App", undefined, PARAMS);
  expect(appBarTitle).toBeInTheDocument();

  const morePublicPollsLabel = await screen.findByText(
    "More Public Polls...",
    undefined,
    PARAMS
  );
  expect(morePublicPollsLabel).toBeInTheDocument();

  for (let buttonText of ["Copy", "Share", "Add New", "Random"]) {
    const button = await screen.findByText(buttonText, undefined, PARAMS);
    expect(button).toBeInTheDocument();
  }
});
