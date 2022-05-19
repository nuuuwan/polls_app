import * as AWS from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk";

export default class PollsAppDB {
  static init() {
    const configuration: ConfigurationOptions = {
      region: process.env.REACT_APP_AWS_REGION,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
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
