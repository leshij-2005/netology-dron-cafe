const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000; 

const app = express();

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use(function errorHandler(err, req, res, next) {
  res
    .status(500)
    .render('error', { 
      error: err
    });
});

app.listen(PORT).on('listening', () => {
  console.log(`Start HTTP on port ${PORT}`);
});

app.use('/auth', require('./v1/auth'));