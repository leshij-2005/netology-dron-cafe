const express = require('express');
const drone = require('netology-fake-drone-api');
const mongoose = require('../db');
const io = require('../../../module/socket');

const app = express();

const Order = mongoose.model('Order');
const User = mongoose.model('User');

const updateState = (id, state, cb) => {
  Order.update({ _id: id }, { $set: { state: state } }, (error, result) => {
    if (error) {
      console.error('Неудалось обновить данные в коллекции. Ошибка:', error);
    } else {
      Order.findById(id, cb);
    }
  });
}

const remove = (id, cb) => {
  setTimeout(() => {
    Order.remove({ _id: id }, (error, result) => {
      if (error) {
        console.error('Неудалось удалить данные из коллекции. Ошибка:', error);
      } else if (cb) {
        cb();
      }
    });
  }, 120000);
} 

app.get('/orders/:state', ({ params } , response) => {
  if (!params || !params.state) {
    response
      .sendStatus(400)
      .render('error', { 
        error: 'Not params'
      });

    return;
  }

  Order.find({ state: params.state }).exec((error, result) => {
    if (error) {
      console.error('Неудалось получить данные из коллекции. Ошибка:', error);
    }
    else {
      response.json(result);
    }
  });
});

app.post('/process/:id', ({ params } , response) => {
  if (!params || !params.id) {
    response
      .sendStatus(400)
      .render('error', { 
        error: 'Not params'
      });

    return;
  }

  updateState(params.id, 'process', (result) => {
    response.json(result);

    io.emitSocketByUser(result.user_id, 'order-changed', result);
  });
});

app.post('/delivery/:id', ({ params } , response) => {
  if (!params || !params.id) {
    response
      .sendStatus(400)
      .render('error', { 
        error: 'Not params'
      });

    return;
  }
  
  updateState(params.id, 'delivered', (result) => {
    response.json(result);

    drone
      .deliver()
      .then(() => {
        updateState(params.id, 'submitted', (result) => {
          io.emitSocketByUser(result.user_id, 'order-changed', result);

          remove(params.id, () => {
            io.emitSocketByUser(result.user_id, 'order-removed');
          });
        });
      })
      .catch(() => {
        updateState(params.id, 'have_difficulties', (result) => {
          io.emitSocketByUser(result.user_id,'order-changed', result);

          User.updateBalance(result.user_id, result.dish.price, (error, result) => {
            io.emitSocketByUser(result.user_id, 'update-balance', result);
          });

          remove(params.id, () => {
            io.emitSocketByUser(result.user_id, 'order-removed');
          });
        });
      });

    io.emitSocketByUser(result.user_id, 'order-changed', result);
  });
});

module.exports = app;