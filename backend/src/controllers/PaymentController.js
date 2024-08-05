const PaymentService = require('../services/PaymentService');

module.exports = {
  async createPaymentIntent(req, res) {
    try {
      const { amount, currency } = req.body;
      const paymentIntent = await PaymentService.createPaymentIntent(amount, currency);
      res.status(201).json(paymentIntent);
    } catch (error) {
      console.error('Error creating payment intent:', error);
      res.status(400).json({ error: error.message });
    }
  },

  async createCustomer(req, res) {
    try {
      const { email, name } = req.body;
      const customer = await PaymentService.createCustomer(email, name);
      res.status(201).json(customer);
    } catch (error) {
      console.error('Error creating customer:', error);
      res.status(400).json({ error: error.message });
    }
  },

  async createCharge(req, res) {
    try {
      const { customerId, amount, currency } = req.body;
      const charge = await PaymentService.createCharge(customerId, amount, currency);
      res.status(201).json(charge);
    } catch (error) {
      console.error('Error creating charge:', error);
      res.status(400).json({ error: error.message });
    }
  },
};
