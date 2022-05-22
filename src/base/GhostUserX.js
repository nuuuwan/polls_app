import axios from "axios";
import Cache from "./Cache";
import HashX from "./HashX";

const URL_GEOLOCATION_DB = "https://geolocation-db.com/json/";
const INFO_HASH_SALT = "adb034fad7a9f45ebc20249cc85eae96";

export default class GhostUserX {
  static async getGeoLocationInfo() {
    const res = await axios.get(URL_GEOLOCATION_DB);
    const data = res.data;
    const countryCode = data.country_code;
    const countryName = data.country_name;
    const ipV4 = data.IPv4;
    const latLng = [data.latitude, data.longitude];
    const infoHash = HashX.md5({ countryCode, latLng, ipV4, INFO_HASH_SALT });
    const userID = infoHash;
    return { countryCode, countryName, latLng, ipV4, infoHash, userID };
  }

  static async getInfo() {
    return await Cache.get("GhostUserX.getInfo", GhostUserX.getGeoLocationInfo);
  }
}
