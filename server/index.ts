import PollApi from './PollApi/PollApi.js'
import WebSocketsServer from './WebSocketsServer/WebSocketsServer.js'

const API_LIST = [
  'https://data--us-east.upscope.io/status?stats=1',
  'https://data--eu-west.upscope.io/status?stats=1',
  'https://data--eu-central.upscope.io/status?stats=1',
  'https://data--us-west.upscope.io/status?stats=1',
  'https://data--sa-east.upscope.io/status?stats=1',
  'https://data--ap-southeast.upscope.io/status?stats=1',
]
const POLL_INTERVAL = 1000
const WS_INTERVAL = 1000
const WS_PORT = parseInt(process.env.PORT || '8080')

const wsServer = new WebSocketsServer(WS_PORT, WS_INTERVAL)
const callback = wsServer.start()
const poller = new PollApi(callback)

API_LIST.forEach((url: string) => {
  poller.addUrl(url, POLL_INTERVAL)
})

console.log(`Server attempting to start on port ${WS_PORT}`)
