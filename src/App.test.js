import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import App from "./App";

jest.setTimeout(120_000);
const PARAMS_TIMEOUT = { timeout: 10_000 };

test("Polls Page", async () => {
  // Wait for Page to Load
  render(<App />);
  await waitFor(() => screen.findByText("Polls App"), PARAMS_TIMEOUT);
  expect(screen.getByText("Polls App")).toBeInTheDocument();
  await waitFor(() => screen.findByText("Copy"), {
    timeout: 10_000,
  });

  // Validate Bottom Navigation
  expect(screen.getByText("Copy")).toBeInTheDocument();
  expect(screen.getByText("Share")).toBeInTheDocument();
  expect(screen.getByText("Add New")).toBeInTheDocument();
  expect(screen.getByText("Random")).toBeInTheDocument();
});

test("Help Page", async () => {
  // Wait for Page to Load
  render(<App />);
  await waitFor(() => screen.findByText("Copy"), PARAMS_TIMEOUT);

  // Click on Menu
  const button = screen.getByRole("button", {
    name: "CustomAppBarMenu.button",
  });
  fireEvent(button, new MouseEvent("click", { bubbles: true }));

  // Click on Help
  await waitFor(() => screen.findByText("Help & FAQs"), PARAMS_TIMEOUT);
  const buttonHelp = screen.getByText("Help & FAQs");
  fireEvent(buttonHelp, new MouseEvent("click"));

  // Validate HelpPage
  await waitFor(() => screen.findByText("FAQs"), PARAMS_TIMEOUT);
  expect(screen.getByText("FAQs")).toBeInTheDocument();
});
