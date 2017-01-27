const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const socketIO = require('./module/socket');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIO.attach(server);

server.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

app.use(express.static(__dirname + '/../'));

app.use((req, res, next) => {
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '5mb', extended: true}));

app.use('/api/v1', require('./api/v1'));

app.use((err, req, res, next) => {
  res
    .status(500)
    .render('error', { 
      error: err
    });
});