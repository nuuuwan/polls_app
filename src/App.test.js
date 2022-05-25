import { render, screen } from "@testing-library/react";
import App from "./App";

const PARAMS = { timeout: 20_000 };

test("Polls Page", async () => {
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
