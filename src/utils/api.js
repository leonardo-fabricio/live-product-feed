require("dotenv").config();
const crypto = require("crypto")

const uuid = crypto.randomUUID()
const WEBSOCKET_TOKEN = process.env.WEBSOCKET_TOKEN;
const EMIT_NEW_PRODUCT_TOKEN = process.env.EMIT_NEW_PRODUCT_TOKEN;
const socketPath = `ws://localhost:8080?token=${WEBSOCKET_TOKEN}&uuid=${uuid}`
 
function emitNewProduct (product){
    const socket = new WebSocket(socketPath)   
    socket.addEventListener("open", ()=>{
       socket.send(JSON.stringify({messageToken: EMIT_NEW_PRODUCT_TOKEN,event: "emit", product}))
    })
}

function dataValidation(product_id){
    return !!product_id
}

module.exports = {
    emitNewProduct,
    dataValidation
}