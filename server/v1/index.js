const express = require('express');

const app = express();

app.use('/auth', require('./auth'));
app.use('/balance', require('./balance'));
app.use('/orders', require('./orders'));
app.use('/profile', require('./profile'));
app.use('/kitchen', require('./kitchen'));


module.exports = app;