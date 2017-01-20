const express = require('express');
const mongoose = require('../db');

const app = express();

const { Schema } = mongoose;

const schema = new Schema({
  dish: Object,
  state: { type: String, default: 'created' },
  user_id: 'ObjectId'
});

schema.statics.findById = function(id, cb) {
  return this.find({ _id: id }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      cb(result[0]);
    }
  });
}

const Order = mongoose.model('Order', schema);
const User = mongoose.model('User');

app.get('/:id', ({ params }, response) => {
  if (!params || !params.id) {
    response
      .sendStatus(400)
      .render('error', { 
        error: 'Not params'
      });

    return;
  }

  Order.find({ user_id: params.id }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.post('/', ({ body, socket }, response) => {
  if (!body) {
    response
      .sendStatus(400)
      .render('error', { 
        error: 'Not params'
      });

    return;
  }

  Order.create(body, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные в коллекцию. Ошибка:', error);
    }
    else {
      response.json(result);

      const price = body.dish.price;

      User.updateBalance(body.user_id, -price, (error, result) => {
        socket.sockets.emit('update-balance', result);
      });

      socket.sockets.emit('new-order', result);
    }
  });
});

module.exports = app;