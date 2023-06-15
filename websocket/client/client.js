const wsclient = document.getElementById("wsclient");
const ws = new WebSocket("ws://localhost:3030");

ws.onopen = () => {
    wsclient.innerHTML += "Connected to WS Server<br>";
};