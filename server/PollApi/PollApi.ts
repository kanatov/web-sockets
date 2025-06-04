export type CacheElement = {
  data: Object;
  lastUpdate: Date;
  errorMessage: string;
};

export default class PollApi {
  private cache: Map<string, CacheElement> = new Map();
  private defaultInterval: number = 5000;
  private callback;

  constructor(callback: (update: CacheElement[]) => void) {
    this.callback = callback;
  }

  updateCache(url: string, res: { data?: Object; errorMessage?: string }) {
    const currentData = this.cache.get(url);
    let newData = {
      data: {},
      lastUpdate: new Date(),
      errorMessage: "",
    };
    newData = {
      ...newData,
      // Applying default values
      ...(currentData ? currentData : {}),
      // Overwriting default values with cached if available
      ...(res ? res : {}),
      // Overwriting defaults and cache with new values if available
    };
    this.cache.set(url, newData);
    const currentCache = Array.from(this.cache, ([url, value]) => [
      { url, ...value },
    ]);
    this.callback(currentCache);
  }

  addUrl(url: string, interval: number = this.defaultInterval) {
    if (!url) {
      console.error("No url to poll");
      return;
    }
    if (this.cache.has(url)) {
      console.warn(`The url "${url}" has already cached`);
      return;
    }
    const poll = async () => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        // The response is always unique
        // so we always update the cache
        this.updateCache(url, { data });
      } catch (e) {
        console.error(
          `Error fetching url: ${url}.\nError message: ${e.message}`
        );
        this.updateCache(url, { errorMessage: e.message });
      }
    };
    poll();
    // Each request polls independently,
    // regarding the state of others.
    // Each request has it's own update interval
    // in case of different frequency of updates.
    // TODO: delete interval and cache entry
    setInterval(poll, interval);
  }
}
