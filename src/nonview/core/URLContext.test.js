import URLContext from "./URLContext";

import HelpPage from "../../view/pages/HelpPage";
import PollPage from "../../view/pages/PollPage";
import UserPage from "../../view/pages/UserPage";

test("getPageName", () => {
  for (let [Page, expectedPageName] of [
    [PollPage, "poll"],
    [HelpPage, "help"],
    [UserPage, "user"],
  ]) {
    expect(URLContext.getPageName(Page)).toBe(expectedPageName);
  }
});
