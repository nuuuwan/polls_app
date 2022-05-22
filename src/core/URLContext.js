import PollPage from "../stateful/pages/PollPage";
import HelpPage from "../stateful/pages/HelpPage";
import UserPage from "../stateful/pages/UserPage";

const PAGES = [UserPage, PollPage, HelpPage];
const DEFAULT_PAGE = PollPage;

export default class URLContext {
  static getURL() {
    return window.location.href;
  }

  static setURL(url) {
    window.history.pushState("", "", url);
  }

  static contextToURL({ Page, pollID }) {
    return "#" + Page.name + "#" + pollID;
  }

  static urlToContext(url) {
    const params = url.split("#");

    let Page = DEFAULT_PAGE;
    if (params.length >= 2) {
      const pageName = params[1];
      for (let Page0 of PAGES) {
        if (Page0.name === pageName) {
          Page = Page0;
        }
      }
    }

    let pollID = undefined;
    if (params.length >= 3) {
      pollID = params[2];
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