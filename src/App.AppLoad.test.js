import { mock, unmock } from "./view/_tests/MockExternals";
import { defaultAppLoad } from "./view/_tests/Tests";

beforeEach(mock);
afterAll(unmock);

test("Polls Page", async () => {
  await defaultAppLoad();
});
