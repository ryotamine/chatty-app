// // server.js
// const express = require('express');
// const SocketServer = require('ws').Server;

// // Set the port to 3001
// const PORT = 3001;

// // Create a new express server
// const server = express()
//    // Make the express server serve static assets (html, javascript, css) from the /public folder
//   .use(express.static('public'))
//   .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }.\nClient connected`));

// // Create the WebSockets server
// const wss = new SocketServer({ server });

// // Set up a callback that will run when a client connects to the server
// // When a client connects they are assigned a socket, represented by
// // the ws parameter in the callback.
// wss.on('connection', (ws) => {
//   console.log('Client connected');

//   // Set up a callback for when a client closes the socket. This usually means they closed their browser.
//   ws.on('close', () => console.log('Client disconnected'));
// });

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