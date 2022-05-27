import PollExtended from "../../nonview/core/PollExtended";

export const testGeoLocationInfo = {
  countryCode: "LK",
  countryName: "Sri Lanka",
  latLng: [1, 1],
  ipV4: "1.1.1.1",
  infoHash: "11111111111111111111111111111111",
  userID: "11111111111111111111111111111111",
};

export const testPollExtended = PollExtended.fromDict({
  pollID: "test-poll-id-0",
  question: "Does this test question have an answer?",
  answerListJSON: JSON.stringify(["Yes", "No"]),
  visibility: "public",
  answerToCount: { yes: 123, no: 54 },
  userAnswer: "Yes",
});
