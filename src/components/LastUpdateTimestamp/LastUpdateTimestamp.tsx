import useStatusStore from '../../store/statusStore'

export default function LastUpdateTimestamp() {
  const lastUpdate = useStatusStore(({ lastUpdate }) => lastUpdate)
  return (
    <p className="text-xs text-neutral-500">
      {lastUpdate && (
        <strong>Last update: {lastUpdate.toLocaleString()}</strong>
      )}
    </p>
  )
}
