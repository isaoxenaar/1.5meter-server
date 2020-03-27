const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = 4001;
const app = express();

const server = http.createServer(app);
const io = socketIO(server);
const allCoordinates = {};

io.on("connection", socket => {
  console.log("New client connected", socket.id);

  socket.on("add coordinates", coordinate => {
    const now = Date.now();
    console.log("this is now", now);
    console.log("new coordinates are: ", coordinate);
    console.log("socket id", socket.id);
    allCoordinates[socket.id] = coordinate;
    allCoordinates.time = now;
    io.sockets.emit("all coordinates", allCoordinates);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
