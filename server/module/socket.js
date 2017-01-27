const socketIO = require('socket.io');

const io = new socketIO();

io.userSockets = {};

io.addSocketByUser = (id, socket) => {
  if (!io.userSockets[id]) {
    io.userSockets[id] = [];
  }

  io.userSockets[id].push(socket);
}

io.getSocketsByUser = (id) => {
  return io.userSockets[id];
}

io.emitSocketByUser = (id, event, data) => {
  const sockets = io.getSocketsByUser(id);

  sockets.forEach((socket, idx) => {
    if (socket.connected) {
      socket.emit(event, data);
    }
  });
}

io.on('connection', socket => {
  socket.on('signin-user', (user) => {
    io.addSocketByUser(user._id, socket);
  });
});

module.exports = io;