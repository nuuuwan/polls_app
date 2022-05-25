import URLContext from "./URLContext";

import PollPage from "../stateful/pages/PollPage";
import HelpPage from "../stateful/pages/HelpPage";
import UserPage from "../stateful/pages/UserPage";

test("getPageName", () => {
  expect(URLContext.getPageName(PollPage)).toBe("poll");
  expect(URLContext.getPageName(HelpPage)).toBe("help");
  expect(URLContext.getPageName(UserPage)).toBe("user");
});
