const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const Order = mongoose.model('Order');
const User = mongoose.model('User');

app.get('/orders/:state', ({ params } , response) => {
  Order.find({ state: params.state }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.post('/process/:id', ({ params, socket } , response) => {
  Order.update({ _id: params.id }, { $set: { state: 'process' } }, (error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);

      socket.sockets.emit('order-changed', result);
    }
  });
});

app.post('/delivery/:id', ({ params, socket } , response) => {
  Order.update({ _id: params.id }, { $set: { state: 'delivered' } }, (error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);

      socket.sockets.emit('order-changed', result);
    }
  });
});

module.exports = app;