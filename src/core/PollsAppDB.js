import * as AWS from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk";
import { AWSSecretConstants } from "../constants/SecretConstants.js";

export default class PollsAppDB {
  static init() {
    const configuration: ConfigurationOptions = {
      region: AWSSecretConstants.region,
      secretAccessKey: AWSSecretConstants.secretAccessKey,
      accessKeyId: AWSSecretConstants.accessKeyId,
    };
    AWS.config.update(configuration);
  }

  static getClient() {
    return new AWS.DynamoDB.DocumentClient();
  }

  static addPollResult(pollResult) {
    PollsAppDB.getClient().put(
      {
        TableName: "polls-app-poll-result",
        Item: pollResult.dict,
      },
      function (err, data) {
        if (err) {
          console.error(err);
        } else {
          console.debug("PollsAppDB.addPollResult complete!");
        }
      }
    );
  }
}

PollsAppDB.init();
