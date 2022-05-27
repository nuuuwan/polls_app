import { init } from "./view/_tests/MockExternals";
import { screenFindByText, click, defaultAppLoad } from "./view/_tests/Tests";

init();

test("Add New Poll", async () => {
  await defaultAppLoad();
  const button = await screenFindByText("Add New");
  click(button);
  await screenFindByText("Question");
});
