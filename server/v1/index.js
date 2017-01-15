const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/balance', require('./balance'));

module.exports = app;