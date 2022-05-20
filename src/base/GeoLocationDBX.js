import axios from "axios";
import HashX from "./HashX";

const URL_GEOLOCATION_DB = "https://geolocation-db.com/json/";

export default class GeoLocationDBX {
  static async getInfo() {
    const res = await axios.get(URL_GEOLOCATION_DB);
    const data = res.data;
    const countryCode = data.country_code;
    const ipV4 = data.IPv4;
    const latLng = [data.latitude, data.longitude];
    const infoHash = HashX.md5({ countryCode, latLng, ipV4 });
    return { countryCode, latLng, ipV4, infoHash };
  }
}