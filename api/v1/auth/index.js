const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const schema = new Schema({
  name: String,
  email: String,
  balance: Number
});

schema.statics.findByEmail = function(email, cb) {
  return this.find({ email: email }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      cb(result[0]);
    }
  });
}

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

schema.statics.updateBalance = function(id, balance, cb) {
  return this.update({ _id: id }, { $inc: { balance: balance } }, (error, result) => {
    if (error) {
      console.error('Неудалось обновить данные в коллекции. Ошибка:', error);
    }
    else {
      cb(result);
    }
  });
}

const User = mongoose.model('User', schema);

const createUser = (data, cb) => {
  data.balance = 100;

  User.create(data, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные в коллекцию. Ошибка:', error);
    }
    else {
      cb(result)
    }
  });
}

app.post('/', ({ body }, response) => {
  if (!body || !body.email) {
    response
      .sendStatus(400)
      .json({ 
        error: 'Not params'
      });

    return;
  }

  User.findByEmail(body.email, (result) => {
    if (result) {
      response.json(result);
    } else {
      createUser(body, (result) => {
        response.json(result);
      });
    }
  });
});

module.exports = app;