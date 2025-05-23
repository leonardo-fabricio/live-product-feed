require("dotenv").config();
const { onListening, authenticate } = require("./utils/wss");
const WebSocket = require("ws");

const socketPort = process.env.WEBSOCKET_PORT;
const EMIT_NEW_PRODUCT_TOKEN = process.env.EMIT_NEW_PRODUCT_TOKEN;
const wss = new WebSocket.Server({ port: socketPort });

wss.on("listening", onListening);
wss.on("connection", (ws, req) => {
  const { isValid, uuid } = authenticate(req.url);
  if (!isValid) {
    ws.send("\x1b[31mError 403: Please enter the correct token\x1b[0m");
    ws.terminate();
  }

  console.log(`| \x1b[32mopen conection - (client: ${uuid})\x1b[0m`);
  ws.send(JSON.stringify({uuid, product: "Nothing here"}));


  ws.on("message", (msg) => {
    const messageClient = msg.toString("utf8");
    const data = JSON.parse(messageClient)  || undefined
    if(data && data.event == "emit" && data.messageToken == EMIT_NEW_PRODUCT_TOKEN){
      wss.clients.forEach(client => {
        client.send(JSON.stringify(data.product))
      })
    }
   
  })

  ws.on("close", () => {
    console.log(`| \x1b[31mconection closed - (client: ${uuid})\x1b[0m`);
  });
});
