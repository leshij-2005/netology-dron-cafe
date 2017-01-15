const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/balance', require('./balance'));
app.use('/orders', require('./orders'));


module.exports = app;