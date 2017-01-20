const mongoose = require('mongoose');

const URL = process.env.NODE_ENV == 'development' ? 'mongodb://localhost:27017/netology-dron-cafe' : 'mongodb://root:123456@ds117189.mlab.com:17189/heroku_5545vsbh';

mongoose.connect(URL);

mongoose.connection.on('error', (error) => {
  console.error('DB connection error:', error);
});

mongoose.connection.once('open', () => {
  console.log('DB connection opened');
});

module.exports = mongoose;