const express = require('express');
const mongoose = require('../db');

const { Schema } = mongoose;

const app = express();

const User = mongoose.model('User');

app.get('/:id', ({ params }, response) => {
  User.findById(params.id, (result) => {
    response.json(result);
  });
});

module.exports = app;