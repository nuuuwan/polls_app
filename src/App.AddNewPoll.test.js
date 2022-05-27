import { screenFindByText, click, defaultAppLoad } from "./view/tests/Tests";

test("Add New Poll", async () => {
  await defaultAppLoad();
  const button = await screenFindByText("Add New");
  click(button);
  await screenFindByText("Question");
});
