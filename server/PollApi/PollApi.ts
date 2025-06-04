export type CacheElement = {
  data: Object;
  lastUpdate: Date;
  errorMessage: string;
};

export default class PollApi {
  private cache: Map<string, CacheElement> = new Map();
  private defaultInterval: number = 5000;
  private callback;

  constructor(callback: (update: CacheElement) => void) {
    this.callback = callback;
  }
  update(url: string, res: { data?: Object; errorMessage?: string }) {
    const currentData = this.cache.get(url);
    let newData = {
      data: {},
      lastUpdate: new Date(),
      errorMessage: "",
    };
    newData = {
      ...newData, // Applying default values
      ...(currentData ? currentData : {}), // Overwriting default values with cached if available
      ...(res ? res : {}), // Overwriting defaults and cache with new values if available
    };
    this.cache.set(url, newData);
    this.callback(newData);
  }
  add(url: string, interval: number = this.defaultInterval) {
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
        this.update(url, { data });
      } catch (e) {
        console.error(
          `Error fetching url: ${url}.\nError message: ${e.message}`
        );
        this.update(url, { errorMessage: e.message });
      }
    };
    poll();
    setInterval(poll, interval); // Cam't delete the timer for now
  }
}
