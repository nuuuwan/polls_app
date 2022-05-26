export default class Cache {
  static async get(cacheKey, asyncFallback) {
    const hotItem = localStorage.getItem(cacheKey);
    if (hotItem && hotItem !== "" && hotItem !== null && hotItem !== "null") {
      return JSON.parse(hotItem);
    }

    const coldItem = await asyncFallback();
    try {
      Cache.set(cacheKey, coldItem);
    } catch (QuotaExceededError) {
      localStorage.clear();
    }
    return coldItem;
  }

  static set(cacheKey, item) {
    localStorage.setItem(cacheKey, JSON.stringify(item));
  }

  static clear(cacheKey) {
    localStorage.setItem(cacheKey, "");
  }
}
