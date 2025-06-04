import WebSocket, { WebSocketServer } from "ws";
import { type CacheElement } from "../PollApi/PollApi.ts";

// Making the class data agnostic
export default class WebSocketsServer {
  private wss: WebSocketServer | null = null;
  private data: CacheElement[] = [];
  private interval;
  private port;

  constructor(port: number = 8080, interval: number = 1000) {
    this.interval = interval;
    this.port = port;
  }

  start() {
    this.wss = new WebSocketServer({
      port: this.port,
    });

    this.wss.on("listening", () => {
      console.log(`Web Socket Server started on port: ${this.port}`);
    });

    this.wss.on("connection", () => {
      console.log("Clients: ", this.wss.clients.size);
    });

    // TODO: remove interval and destroy the server
    setInterval(() => {
      if (this.wss.clients.size > 0) {
        this.broadcast();
      }
    }, this.interval);

    // Providing callback function
    // to update the broadcasted data
    return (data: CacheElement[]) => {
      this.data = data;
    };
  }

  broadcast() {
    this.wss.clients.forEach((client: WebSocket) => {
      client.send(JSON.stringify(this.data));
    });
  }
}
