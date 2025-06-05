import { updateStore } from "../store/statusStore";

function connect() {
  console.log("Client websocket connection started");
  const ws = new WebSocket("ws://localhost:8080");
  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    updateStore(data);
  };
}

export default connect;
