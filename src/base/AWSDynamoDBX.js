import * as AWS from "aws-sdk";
import { ConfigurationOptions } from "aws-sdk";

export default class AWSDynamoDBX {
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

  static async generic(funcGenericGetter, params) {
    const client = AWSDynamoDBX.getClient();
    const funcGeneric = funcGenericGetter(client).bind(client);
    return new Promise(function (resolve, reject) {
      funcGeneric(params, function (err, data) {
        if (err) {
          console.error(err);
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  static async put(tableName, item) {
    return await AWSDynamoDBX.generic((client) => client.put, {
      TableName: tableName,
      Item: item,
    });
  }

  static async scan(tableName) {
    return await AWSDynamoDBX.generic((client) => client.scan, {
      TableName: tableName,
    });
  }
}

AWSDynamoDBX.init();
