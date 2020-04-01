const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const port = process.env.PORT || 4001;
const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const authRouter = require("./auth/router");
// const userRouter = require("./user/router");
// const db = require("./db");
// const { User } = require("./user/model");

const server = http.createServer(app);
const io = socketIO(server);
const allCoordinates = {};

// app.use(cors());
// app.use(bodyParser.json());
// app.use(authRouter);
// app.use(userRouter);

io.on("connection", socket => {
  console.log("New client connected", socket.id);

  socket.on("add coordinates", coordinate => {
    const now = Date.now();
    console.log("this is now", now);
    console.log("new coordinates are: ", coordinate);
    console.log("socket id", socket.id);
    allCoordinates[socket.id] = coordinate;
    allCoordinates[socket.id].time = now;
    io.sockets.emit("all coordinates", allCoordinates);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
