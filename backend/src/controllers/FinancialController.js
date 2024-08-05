// src/controllers/FinancialController.js
const { Transaction } = require('../models');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async createCharge(req, res) {
    try {
      const { amount, currency, source, description } = req.body;
      const charge = await stripe.charges.create({
        amount,
        currency,
        source,
        description,
      });

      // Save the transaction in the database
      const transaction = await Transaction.create({
        amount: charge.amount / 100,  // Convert from cents to dollars
        type: 'income',
        description: charge.description,
        companyId: req.user.companyId,
        patientId: req.body.patientId,
      });

      return res.status(201).json(transaction);
    } catch (error) {
      console.error('Error creating charge:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getFinancialReport(req, res) {
    try {
      const { startDate, endDate } = req.query;
      const transactions = await Transaction.findAll({
        where: {
          createdAt: {
            [Op.between]: [new Date(startDate), new Date(endDate)],
          },
          companyId: req.user.companyId,
        },
      });

      const report = {
        totalIncome: transactions
          .filter(t => t.type === 'income')
          .reduce((acc, t) => acc + parseFloat(t.amount), 0),
        totalExpenses: transactions
          .filter(t => t.type === 'expense')
          .reduce((acc, t) => acc + parseFloat(t.amount), 0),
        balance: 0,
      };

      report.balance = report.totalIncome - report.totalExpenses;

      res.status(200).json(report);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
