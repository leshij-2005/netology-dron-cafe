const express = require('express');
const mongoose = require('../db');
const io = require('../../../module/socket');

const { Schema } = mongoose;

const app = express();

const User = mongoose.model('User');

app.post('/', ({ body }, response) => {
  if (!body || !body.id) {
    response
      .sendStatus(400)
      .render('error', { 
        error: 'Not params'
      });

    return;
  }
  
  User.updateBalance(body.id, 100, (error, result) => {
    io.emitSocketByUser(body.id, 'update-balance', result);
    
    User.findById(body.id, (result) => {
      response.json(result);
    });
  });
});

module.exports = app;