const { Transaction } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const transaction = await Transaction.create(req.body);
      return res.status(201).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const transactions = await Transaction.findAll();
      return res.status(200).json(transactions);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findByPk(id);
      if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res.status(200).json(transaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Transaction.update(req.body, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      const updatedTransaction = await Transaction.findByPk(id);
      return res.status(200).json(updatedTransaction);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Transaction.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Transaction not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
