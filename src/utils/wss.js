require("dotenv").config()
const url = require("url")
const socketPort = process.env.WEBSOCKET_PORT
const tokenValid = process.env.WEBSOCKET_TOKEN

function onListening () {
    console.log(`| \x1b[32msocket listening\x1b[0m\n| \x1b[33mws://localhost:${socketPort}\x1b[0m`)
}

function onConnection (ws, req){
   
}

function authenticate (reqUrl){
    const queryParams = url.parse(reqUrl, true).query;
    const { token, uuid } = queryParams
    return { isValid: token == tokenValid, uuid }
}

module.exports = {
    onListening,
    onConnection,
    authenticate
}