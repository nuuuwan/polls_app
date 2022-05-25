import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

jest.setTimeout(120_000);

test("Polls Page", async () => {
  render(<App />);

  await waitFor(() => screen.findByText("Polls App"), { timeout: 60_000 });

  const appBarTitle = screen.getByText("Polls App");
  expect(appBarTitle).toBeInTheDocument();
});
