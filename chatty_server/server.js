const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = 3001;
const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
};

wss.on('connection', ws => {
  ws.on('message', data => {
    console.log('received a message %s', data);
    const json = JSON.parse(data);

    wss.broadcast(json);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on ${ PORT }.\nClient connected`);
});