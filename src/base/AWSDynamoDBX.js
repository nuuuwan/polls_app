import { WWW } from "@nuuuwan/utils-js-dev";

export default class AWSDynamoDBX {
  static getURLLambda() {
    return process.env.REACT_APP_URL_LAMBDA;
  }

  static async multiGet(className) {
    const url = AWSDynamoDBX.getURLLambda();
    const cmd = "multiget-" + className + "s";
    return await WWW.json(url + "?cmd=" + cmd);
  }

  static async put(className, d) {
    const url = AWSDynamoDBX.getURLLambda();
    const cmd = "put-" + className;
    return await WWW.json(url + "?cmd=" + cmd + "&d=" + JSON.stringify(d));
  }
}

console.debug(AWSDynamoDBX.getURLLambda());
