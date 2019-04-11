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
      // console.log(data);
    }
  });
};

wss.on('connection', ws => {
  console.log('Client connected');

  //console.log(wss.clients.size);
  const login = {
    clients: wss.clients.size,
    type: 'user'
  };
  console.log(login.clients);
  wss.broadcast(login);

  ws.on('message', data => {
    console.log('received a message %s', data);
    const json = JSON.parse(data);

    switch(json.type) {
      case 'postNotification':
        wss.broadcast(json);
        break;
      case 'postMessage':
        wss.broadcast(json);
        break;
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');

    //console.log(wss.clients.size);
    const logout = {
      clients: wss.clients.size,
      type: 'user'
    };
    console.log(logout.clients);
    wss.broadcast(logout);
  });

});

server.listen(PORT, () => {
  console.log(`Listening on ${ PORT }.\nClient connected`);
});