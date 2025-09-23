require("dotenv").config();
const WebSocket = require("ws");

const PORT = process.env.PORT;
const clients = new Set();
let wss;

const initializeWebSocketServer = (expressServer) => {
  if (wss) {
    return;
  }

  wss = new WebSocket.Server({ server: expressServer });

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
};
