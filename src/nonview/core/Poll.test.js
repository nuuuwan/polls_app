import Poll from "./Poll";
import { testPollExtended } from "../../nonview/tests/TestData";

test("Poll", () => {
  expect(testPollExtended.question).toBe(
    "Does this test question have an answer?"
  );
  expect(testPollExtended.isQuestionValid).toBe(true);
  expect(testPollExtended.isAnswerListValid).toBe(true);
});
