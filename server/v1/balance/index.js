const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const User = mongoose.model('User');

app.post('/', ({ body, socket }, response) => {
  User.updateBalance(body.id, 100, (error, result) => {
    socket.sockets.emit('update-balance', result);
    
    User.findById(body.id, (result) => {
      response.json(result);
    });
  });
});

module.exports = app;