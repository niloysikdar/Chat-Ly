const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const router = require("./router");
const { addUser, removeUser, getUser, getAllUsersInRoom } = require("./users");

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    console.log(`Name is ${name}, Room is ${room}`);
    const { error, user } = addUser({
      id: socket.id,
      name: name,
      room: room,
    });

    if (error) {
      return callback(error);
    } else {
      socket.join(user.room);

      socket.emit("message", {
        user: "Admin",
        text: `Hey ${user.name}, Welcome to ${user.room}`,
      });
      socket.broadcast.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has joined the Room`,
      });

      callback();
    }
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", {
      user: user.name,
      text: message,
    });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("User has left :(");
  });
});

app.use(router);

server.listen(PORT, () => {
  console.log(`Server has started on Port ${PORT}`);
});
