const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const User = mongoose.model('User');

app.post('/', ({ body }, response) => {
  User.update({ _id: body.id }, { $inc: { balance: 100 } }, (error, result) => {
    if (error) {
      console.error('Неудалось изменить данные в коллекции. Ошибка:', error);
    }
    else {
      User.findById(body.id, (result) => {
        response.json(result);
      });
    }
  });
});

module.exports = app;