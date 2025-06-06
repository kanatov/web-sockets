import { create } from 'zustand'
import { type CacheElement } from '../../server/PollApi/PollApi.ts'

type AllServicesType = {
  region: string
  status: string
}

interface StatusStoreInterface {
  data: CacheElement[]
  allServices: AllServicesType[]
  setData: (data: CacheElement[]) => void
  setAllServices: (newAllServices: AllServicesType[]) => void
}

const useStatusStore = create<StatusStoreInterface>((set, get) => ({
  data: [],
  allServices: [],
  setData: (data: CacheElement[]) => set({ data }),
  setAllServices: (newAllServices: AllServicesType[]) => {
    const currentAllServices = get().allServices
    if (JSON.stringify(newAllServices) !== JSON.stringify(currentAllServices)) {
      set({ allServices: newAllServices })
    }
  },
}))

export function updateStore(data: CacheElement[]) {
  const { setData, setAllServices } = useStatusStore.getState()
  setData(data)

  // Generating allServices from the data
  // so we can track changes
  const allServices = data.map((item) => ({
    region: item.data.region,
    status: item.data.status,
  }))
  setAllServices(allServices)
}
export default useStatusStore
