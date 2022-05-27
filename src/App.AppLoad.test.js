import { init } from "./view/_tests/MockExternals";
import { defaultAppLoad } from "./view/_tests/Tests";

init();

test("Polls Page", async () => {
  await defaultAppLoad();
});
