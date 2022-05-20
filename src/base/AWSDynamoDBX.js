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

  static async multiGet(className) {
    const urlBase = AWSDynamoDBX.getURLLambda();
    const cmd = "multiget-" + className + "s";
    const url = urlBase + "?cmd=" + cmd;
    const response = await jsonNonCache(url);
    return response;
  }

  static async put(className, d) {
    const urlBase = AWSDynamoDBX.getURLLambda();
    const cmd = "put-" + className;
    const dJSONB64 = encodeURIComponent(btoa(JSON.stringify(d)));
    const url = urlBase + "?cmd=" + cmd + "&d_json_b64=" + dJSONB64;
    const response = await jsonNonCache(url);
    return response;
  }
}
