import useStatusStore from '../../store/statusStore'

type ServiceGroupButtonProps = {
  region: string
  status: string
}

export default function ServiceGroupButton({
  region,
  status,
}: ServiceGroupButtonProps) {
  const currentService = useStatusStore(
    ({ currentService }) => currentService === region
  )
  const setCurrentService = useStatusStore((state) => state.setCurrentService)
  return (
    <button
      onClick={() => {
        if (!currentService) {
          setCurrentService(region)
        }
      }}
      className="group"
    >
      <div
        className={`border p-4 rounded ${
          status === 'ok' ? 'border-lime-500' : 'border-red-800'
        } group-hover:border-lime-100 group-hover:bg-lime-600/20 transition-colors duration-300 ${
          currentService ? 'bg-lime-600/20' : ''
        }`}
      >
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p className={`${status === 'ok' ? 'text-lime-500' : 'text-red-800'}`}>
          <strong>Status:</strong> {status}
        </p>
      </div>
    </button>
  )
}
