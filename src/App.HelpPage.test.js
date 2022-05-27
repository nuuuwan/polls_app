import { init } from "./view/_tests/MockExternals";
import { screenFindByText, clickOnMenu } from "./view/_tests/Tests";

init();

test("Help Page", async () => {
  await clickOnMenu("Help & FAQs");
  await screenFindByText("FAQs");
});
