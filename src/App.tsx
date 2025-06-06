import AllServices from './components/AllServices/AllServices'
import LastUpdateTimestamp from './components/LastUpdateTimestamp/LastUpdateTimestamp'
import ServiceDetails from './components/ServiceDetails/ServiceDetails'
import useStatusStore from './store/statusStore'

function App() {
  const updated = useStatusStore((state) => Boolean(state.lastUpdate))
  return (
    <main className="flex flex-col gap-8 items-center justify-center min-h-screen max-w-screen-lg mx-auto px-8 py-16">
      <div className="flex flex-col gap-2 items-center justify-center">
        <h1 className="text-2xl">Services status</h1>
        <LastUpdateTimestamp />
      </div>
      {updated ? (
        <>
          <AllServices />
          <ServiceDetails />
        </>
      ) : (
        <p className="text-neutral-200">Starting web sockets...</p>
      )}
    </main>
  )
}

export default App
