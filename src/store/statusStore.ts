import { create } from 'zustand'
import { type CacheElement } from '../../server/PollApi/PollApi.ts'

type AllServicesType = {
  region: string
  status: string
}

interface StatusStoreInterface {
  data: CacheElement[]
  allServices: AllServicesType[]
  lastUpdate: Date | null
  currentService: string
  setData: (data: CacheElement[]) => void
  setAllServices: (newAllServices: AllServicesType[]) => void
  setLastUpdate: (lastUpdate: Date) => void
  setCurrentService: (service: string) => void
}

const useStatusStore = create<StatusStoreInterface>((set, get) => ({
  data: [],
  allServices: [],
  lastUpdate: null,
  currentService: '',
  setData: (data: CacheElement[]) => set({ data }),
  setAllServices: (newAllServices: AllServicesType[]) => {
    const currentAllServices = get().allServices
    if (JSON.stringify(newAllServices) !== JSON.stringify(currentAllServices)) {
      set({ allServices: newAllServices })
    }
  },
  setLastUpdate: (lastUpdate: Date) => set({ lastUpdate }),
  setCurrentService: (service: string) => set({ currentService: service }),
}))

export function updateStore(data: CacheElement[]) {
  const {
    setData,
    setAllServices,
    setLastUpdate,
    currentService,
    setCurrentService,
  } = useStatusStore.getState()
  setData(data)

  // Generating allServices from the data
  // so we can track changes
  const allServices = data.map((item) => ({
    region: item.data.region,
    status: item.data.status,
  }))
  setAllServices(allServices)
  setLastUpdate(new Date())
  if (currentService === '') {
    setCurrentService(allServices[0].region)
  }
}
export default useStatusStore
