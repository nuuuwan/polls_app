import URLContext from "./URLContext";

import PollPage from "../../components/pages/PollPage";
import HelpPage from "../../components/pages/HelpPage";
import UserPage from "../../components/pages/UserPage";

test("getPageName", () => {
  expect(URLContext.getPageName(PollPage)).toBe("poll");
  expect(URLContext.getPageName(HelpPage)).toBe("help");
  expect(URLContext.getPageName(UserPage)).toBe("user");
});
