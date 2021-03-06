import PollExtended from "../../nonview/core/PollExtended";

export const testGeoLocationInfo = {
  countryCode: "LK",
  countryName: "Sri Lanka",
  latLng: [1, 1],
  ipV4: "1.1.1.1",
  infoHash: "1234567890abcdef1234567890abcdef",
  userID: "1234567890abcdef1234567890abcdef",
};

export const testPollExtended = PollExtended.fromDict({
  pollID: "test-poll-id-0",
  question: "Does this test question have an answer?",
  answerListJSON: JSON.stringify(["Yes", "No", "Undecided"]),
  visibility: "public",
  answerToCount: { Yes: 123, No: 54 },
  userAnswer: "Yes",
});
