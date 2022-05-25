import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.setTimeout(30_000);

test("Polls Page", async () => {
  render(<App />);

  await waitFor(() => screen.findByText("Polls App"), { timeout: 10_000 });

  const appBarTitle = screen.getByText("Polls App");
  expect(appBarTitle).toBeInTheDocument();

  await waitFor(() => screen.findByText("More Public Polls..."), {
    timeout: 10_000,
  });

  const morePublicPollsLabel = screen.getByText("More Public Polls...");
  expect(morePublicPollsLabel).toBeInTheDocument();

  for (let buttonText of ["Copy", "Share", "Add New", "Random"]) {
    const button = screen.getByText(buttonText);
    expect(button).toBeInTheDocument();
  }
});
