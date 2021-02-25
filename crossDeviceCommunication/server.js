// Import packages
const express = require("express");
const socketIO = require("socket.io");
const path = require("path");

// Configuration
const PORT = process.env.PORT || 4000;
const INDEX = path.join(__dirname, 'index.html');

// Start server
const server = express()
  .get('/', (req, res) => {
    res.sendFile(INDEX)
  })
  .use(express.static(__dirname + '/public'))
 .listen(PORT, () => console.log("Listening on localhost:" + PORT));

// Initiatlize SocketIO
const io = socketIO(server);

// Register "connection" events to the WebSocket
io.on("connection", function(socket) {
  // Register "join" events, requested by a connected client
  console.log('connected to server');
  socket.on("join", function (room) {
    // join channel provided by client
    console.log('join room', room);
    socket.join(room)
    // Register "image" events, sent by the client
    socket.on("message", function(msg) {
      // Broadcast the "image" event to all other clients in the room
      console.log('msg', msg);
      socket.broadcast.to(room).emit("message", msg);
    });
  })
});