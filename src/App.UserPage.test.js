import { init } from "./view/_tests/MockExternals";
import { screenFindByText, clickOnMenu } from "./view/_tests/Tests";

init();

test("User Page", async () => {
  await clickOnMenu("User");
  await screenFindByText("UserID");
});
