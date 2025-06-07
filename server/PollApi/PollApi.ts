export type APIData = {
  status: string
  region: string
  version: string
  results: {
    services: Record<string, boolean>
    stats?: unknown
  }
}

export type CacheElement = {
  url: string
  data: APIData
  lastUpdate: Date
  errorMessage: string
}

function getTimeout(interval: number): Promise<never> {
  return new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Request timed out')), interval)
  )
}

export default class PollApi {
  private cache: Map<string, CacheElement> = new Map()
  private defaultInterval: number = 5000
  private callback

  constructor(callback: (update: CacheElement[]) => void) {
    this.callback = callback
  }

  updateCache(url: string, res: { data?: Object; errorMessage?: string }) {
    // The response always contains a unique data
    // so we always have to update the cache

    const currentData = this.cache.get(url)
    let newData = {
      url,
      errorMessage: '',
      data: {},
      lastUpdate: new Date(),
      // Overwriting default values with cached if available
      ...(currentData ? currentData : {}),
      // Overwriting defaults and cache with new values if available
      ...(res ? res : {}),
    }
    this.cache.set(url, newData as CacheElement)
    const currentCache: CacheElement[] = Array.from(
      this.cache,
      ([_url, value]) => ({ ...value })
    )
    this.callback(currentCache)
  }

  addUrl(url: string, interval: number = this.defaultInterval) {
    if (!url) {
      console.error('No url to poll')
      return
    }
    if (this.cache.has(url)) {
      console.warn(`The url "${url}" has already cached`)
      return
    }
    const poll = async () => {
      try {
        // Handling race conditions
        // by setting up a timeout for the request
        const res = await Promise.race([fetch(url), getTimeout(interval)])
        const data = await res.json()
        this.updateCache(url, { errorMessage: '', data })
      } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : String(e)
        this.updateCache(url, { errorMessage })
      }
    }
    poll()
    // Each request polls independently,
    // regarding the state of others.
    // Each request has it's own update interval
    // in case of different frequency of updates.
    // TODO: delete interval and cache entry
    setInterval(poll, interval)
  }
}
