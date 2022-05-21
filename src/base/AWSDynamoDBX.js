const JSON_HEADERS = {
  headers: {
    Accept: "application/json",
  },
};

async function jsonNonCache(url) {
  const response = await fetch(url, JSON_HEADERS);
  const dataJson = await response.json();
  return dataJson;
}

export default class AWSDynamoDBX {
  static getURLLambda() {
    return process.env.REACT_APP_URL_LAMBDA;
  }

  static async generic(payload) {
    const payloadJSON = JSON.stringify(payload);
    const payloadJSONB64 = btoa(payloadJSON);
    const payloadJSONB64Encoded = encodeURIComponent(payloadJSONB64);
    const url =
      AWSDynamoDBX.getURLLambda() +
      "?payload_json_base64=" +
      payloadJSONB64Encoded;
    const response = await jsonNonCache(url);
    return response;
  }

  static async multiGet(className) {
    return await AWSDynamoDBX.generic({
      cmd: "multiget-" + className + "s",
    });
  }

  static async put(className, d) {
    return await AWSDynamoDBX.generic({
      cmd: "put-" + className,
      d: d,
    });
  }
}
