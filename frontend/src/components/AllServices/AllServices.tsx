import { useMemo } from 'react'
import ServiceGroupButton from '../ServiceGroupButton/ServiceGroupButton'
import useStatusStore from '../../store/statusStore'

export default function AllServices() {
  const allServices = useStatusStore(({ allServices }) => allServices)
  const allServicesMemo = useMemo(() => allServices, [allServices])
  return (
    <div className="flex flex-col gap-4">
      <h3>All Services</h3>
      <div className="grid grid-cols-4 gap-4">
        {allServicesMemo.map(({ region, status }) => (
          <ServiceGroupButton key={region} region={region} status={status} />
        ))}
      </div>
    </div>
  )
}
