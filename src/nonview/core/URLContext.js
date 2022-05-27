import HelpPage from "../../view/pages/HelpPage";
import PollPage from "../../view/pages/PollPage";
import UserPage from "../../view/pages/UserPage";

const PAGE_IDX = {
  user: UserPage,
  poll: PollPage,
  help: HelpPage,
};

const DEFAULT_PAGE = PollPage;

export default class URLContext {
  static getPageName(Page) {
    for (let [pageName0, Page0] of Object.entries(PAGE_IDX)) {
      if (Page === Page0) {
        return pageName0;
      }
    }
    return undefined;
  }

  static getURL() {
    return window.location.href;
  }

  static setURL(url) {
    window.history.pushState("", "", url);
  }

  static contextToURL({ Page, pollID }) {
    const origin = window.location.origin;
    let url = origin + "/polls_app";
    if (Page) {
      url += "#" + URLContext.getPageName(Page);
    }
    if (pollID) {
      url += "-" + pollID;
    }
    return url;
  }

  static urlToContext(url) {
    let Page = DEFAULT_PAGE;
    let pollID = undefined;

    const urlTokens = url.split("#");
    if (urlTokens.length === 2) {
      const params = urlTokens[1].split("-");

      if (params.length >= 1) {
        const pageName = params[0];
        for (let [pageName0, Page0] of Object.entries(PAGE_IDX)) {
          if (pageName0 === pageName) {
            Page = Page0;
          }
        }
      }

      if (params.length >= 2) {
        pollID = params[1];
      }
    }

    return { Page, pollID };
  }

  static setContext(context) {
    const url = URLContext.contextToURL(context);
    URLContext.setURL(url);
  }

  static getContext() {
    const url = URLContext.getURL();
    return URLContext.urlToContext(url);
  }
}
