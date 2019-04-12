const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const PORT = 3001;
const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

// Broadcast data to client
wss.broadcast = data => {
  wss.clients.forEach(ws => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
};

// Connect WebSocket
wss.on('connection', ws => {
  console.log('Client connected');

  // User login
  const login = {
    clients: wss.clients.size,
    type: 'user'
  };
  wss.broadcast(login);

  // Transfer data to broadcast
  ws.on('message', data => {
    const json = JSON.parse(data);

    switch(json.type) {
      case 'postNotification':
        wss.broadcast(json);
        break;
      case 'postMessage':
        wss.broadcast(json);
        break;
      default:
        throw new Error(`Unknown event type ${data.type}`);
    }
  });

  // Close WebSocket
  ws.on('close', () => {
    console.log('Client disconnected');

    // User logout
    const logout = {
      clients: wss.clients.size,
      type: 'user'
    };
    wss.broadcast(logout);
  });
});

// Boot server
server.listen(PORT, () => {
  console.log(`Listening on ${ PORT }.`);
});