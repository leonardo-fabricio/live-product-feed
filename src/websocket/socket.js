require("dotenv").config();
const WebSocket = require("ws");

const SOCKET_KEY = process.env.SOCKET_KEY;
const PORT = process.env.PORT;
const clients = new Set();
let wss;

const initializeWebSocketServer = (expressServer) => {
  if (wss) {
    return;
  }

  wss = new WebSocket.Server({
    server: expressServer,
    verifyClient: (info, done) => {
      const url = new URL(info.req.url, `http://${info.req.headers.host}`);
      const token = url.searchParams.get("token");

      if (token && token === SOCKET_KEY) {
        return done(true);
      } else {
        console.log("WebSocket connection rejected: Invalid or missing token.");
        return done(false, 401, "Unauthorized");
      }
    },
  });

  wss.on("connection", (ws) => {
    console.log("Client connected via WebSocket.");
    clients.add(ws);

    ws.on("close", () => {
      console.log("Client disconnected.");
      clients.delete(ws);
    });

    ws.on("error", (error) => {
      console.error("WebSocket error:", error);
    });
  });

  console.log(`🔌 WebSocket server running on port ${PORT}`);
};

const broadcastMessage = (message) => {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "new_product", content: message }));
    }
  });
};

module.exports = {
  initializeWebSocketServer,
  broadcastMessage,
  clients,
};
