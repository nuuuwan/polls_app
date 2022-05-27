import { screenFindByText, clickOnMenu } from "./view/tests/Tests";

test("Help Page", async () => {
  await clickOnMenu("Help & FAQs");
  await screenFindByText("FAQs");
});
