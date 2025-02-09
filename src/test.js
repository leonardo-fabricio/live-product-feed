const crypto = require("crypto")
const uuid = crypto.randomUUID()
// const token = 123123 // invalid token
const token = 123456
const socketPath = `ws://localhost:8080?token=${token}&uuid=${uuid}`
const socket = new WebSocket(socketPath)

socket.addEventListener("open", ()=>{
    console.log("cliente conectado")

    socket.addEventListener("message", (msg)=> {
        const { data } = msg
        console.log("recebendo messagem", data)
    })
})