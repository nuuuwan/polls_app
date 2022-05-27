import PollExtended from "../../nonview/core/PollExtended";
import AWSDynamoDB from "../../nonview/base/AWSDynamoDB";
import Cache from "../../nonview/base/Cache";
import GhostUser from "../../nonview/base/GhostUser";
import {
  testGeoLocationInfo,
  testPollExtended,
} from "../../nonview/tests/TestData";

export function mock() {
  jest
    .spyOn(Cache, "get")
    .mockImplementation(async function (cacheKey, asyncFallback) {
      return await asyncFallback();
    });

  jest
    .spyOn(GhostUser, "getGeoLocationInfo")
    .mockImplementation(async function () {
      return testGeoLocationInfo;
    });

  jest
    .spyOn(AWSDynamoDB, "generic")
    .mockImplementation(async function (payload) {
      if (payload.cmd === "multiget-ids-polls") {
        return [
          {
            pollID: testPollExtended.pollID,
          },
        ];
      }

      if (payload.cmd === "get-poll-extended") {
        return PollExtended.toDict(testPollExtended);
      }

      if (payload.cmd === "put-poll") {
        return payload.d;
      }

      if (payload.cmd === "put-poll-result") {
        return payload.d;
      }

      return undefined;
    });
}

export function unmock() {
  jest.restoreAllMocks();
}

export function init() {
  beforeEach(mock);
  afterAll(unmock);
}
