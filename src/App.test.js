import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.setTimeout(120_000);

test("Polls Page", async () => {
  render(<App />);

  // AppBar
  await waitFor(() => screen.findByText("Polls App"), { timeout: 60_000 });

  expect(screen.getByText("Polls App")).toBeInTheDocument();

  // PollPage
  await waitFor(() => screen.findByText("More Public Polls..."), {
    timeout: 60_000,
  });

  expect(screen.getByText("More Public Polls...")).toBeInTheDocument();

  expect(screen.getByText("Copy")).toBeInTheDocument();
  expect(screen.getByText("Share")).toBeInTheDocument();
  expect(screen.getByText("Add New")).toBeInTheDocument();
  expect(screen.getByText("Random")).toBeInTheDocument();
});
