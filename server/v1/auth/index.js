const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const schema = new Schema({
  name: String,
  email: String
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

const User = mongoose.model('User', schema);

const createUser = (data, callback) => {
  User.create(body, (error, result) => {
    if (error) {
      console.error('Неудалось установить данные из коллекции. Ошибка:', error);
    }
    else {
      callback(result)
    }
  });
}

app.post('/', ({ body }, response) => {
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