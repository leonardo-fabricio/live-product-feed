const express = require("express");
const path = require("path");
const { createServer } = require("http");
const expressRoutes = require("./http/routes");
const { initializeWebSocketServer } = require("./websocket/socket");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(expressRoutes);
app.use(express.static(path.join(__dirname, "public")));

const server = createServer(app);
initializeWebSocketServer(server);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`🚀 HTTP server running on port ${PORT}`);
  console.log(`🌍 Application available at: http://localhost:${PORT}`);
});
