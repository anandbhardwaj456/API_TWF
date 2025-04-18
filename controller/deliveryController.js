const service = require('../service/deliveryService');

exports.calculateCost = (req, res) => {
  const order = req.body.products || {};
  const cost = service.calculateMinimumCost(order);
  res.json({ minimum_cost: cost });
};