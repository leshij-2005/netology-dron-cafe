const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000; 

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,PUT,POST,DELETE');

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));
app.use((err, req, res, next) => {
  res
    .status(500)
    .render('error', { 
      error: err
    });
});

app.listen(PORT).on('listening', () => {
  console.log(`Start HTTP on port ${PORT}`);
});

app.use('/v1', require('./v1'));