import URLContext from "./URLContext";

import HelpPage from "../../view/pages/HelpPage";
import PollPage from "../../view/pages/PollPage";
import UserPage from "../../view/pages/UserPage";

test("getPageName", () => {
  expect(URLContext.getPageName(PollPage)).toBe("poll");
  expect(URLContext.getPageName(HelpPage)).toBe("help");
  expect(URLContext.getPageName(UserPage)).toBe("user");
});
