require("dotenv").config();
const { onListening, authenticate } = require("./utils/wss");
const WebSocket = require("ws");

const socketPort = process.env.WEBSOCKET_PORT;
const wss = new WebSocket.Server({ port: socketPort });

wss.on("listening", onListening);
wss.on("connection", (ws, req) => {
  const { isValid, uuid } = authenticate(req.url);
  if (!isValid) {
    ws.send("\x1b[31mError 403: Please enter the correct token\x1b[0m");
    ws.terminate();
  }

  console.log(`| \x1b[32mopen conection - (client: ${uuid})\x1b[0m`);
  const data = { productId: 1, time: new Date() };
  ws.send(JSON.stringify(data));

  ws.on("close", (msg) => {
    console.log(`| \x1b[31mconection closed - (client: ${uuid})\x1b[0m`);
  });
});
