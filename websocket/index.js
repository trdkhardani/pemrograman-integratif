const ws = require('ws');
const express = require('express');

const app = express();

const websocket = new ws.Server({
    server: app.listen(3030),
    host: "localhost",
    path: "/"
})

websocket.on("connection", (ws) => {
    console.log("Connected with client")
})

app.listen(console.log("Listening..."))