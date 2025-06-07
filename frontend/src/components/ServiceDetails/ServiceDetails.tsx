import useStatusStore from '../../store/statusStore'
import { type CacheElement } from '../../../../server/PollApi/PollApi.js'

export default function ServiceDetails() {
  const currentService = useStatusStore(({ currentService }) => currentService)
  const { data } = useStatusStore(
    (state) =>
      state.data.find(
        (item: CacheElement) => item.data.region === currentService
      ) || { data: {} }
  )
  return <pre>{JSON.stringify(data, null, 2)}</pre>
}
