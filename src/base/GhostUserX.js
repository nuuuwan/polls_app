import axios from "axios";
import Cache from "./Cache";
import HashX from "./HashX";

const URL_GEOLOCATION_DB = "https://geolocation-db.com/json/";
const USE_RANDOM_SALT = true;
const ID_SALT = "adb034fad7a9f45ebc20249cc85eae96";
const CACHE_KEY_INFO = "polls_app.GhostUserX.info";

export default class GhostUserX {
  static async getInfoNoCache() {
    const res = await axios.get(URL_GEOLOCATION_DB);
    const data = res.data;
    const countryCode = data.country_code;
    const countryName = data.country_name;
    const ipV4 = data.IPv4;
    const latLng = [data.latitude, data.longitude];
    const randomValue = USE_RANDOM_SALT ? Math.random() : ID_SALT;
    const infoHash = HashX.md5({ countryCode, latLng, ipV4, randomValue });
    const userID = infoHash;
    return { countryCode, countryName, latLng, ipV4, infoHash, userID };
  }

  static async getInfo() {
    return await Cache.get(CACHE_KEY_INFO, GhostUserX.getInfoNoCache);
  }
}
