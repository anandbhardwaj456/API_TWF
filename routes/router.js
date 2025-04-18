const controller = require('../controller/deliveryController');

exports.setup = (app) => {
  app.post('/calculate', controller.calculateCost);
};