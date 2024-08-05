const { Commission } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const commission = await Commission.create(req.body);
      return res.status(201).json(commission);
    } catch (error) {
      console.error('Error creating commission:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const commissions = await Commission.findAll({
        where: { companyId: req.user.companyId },
      });
      return res.status(200).json(commissions);
    } catch (error) {
      console.error('Error fetching commissions:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const commission = await Commission.findOne({
        where: { id, companyId: req.user.companyId },
      });
      if (!commission) {
        return res.status(404).json({ error: 'Commission not found' });
      }
      return res.status(200).json(commission);
    } catch (error) {
      console.error('Error fetching commission:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Commission.update(req.body, {
        where: { id, companyId: req.user.companyId },
      });
      if (!updated) {
        return res.status(404).json({ error: 'Commission not found' });
      }
      const updatedCommission = await Commission.findOne({ where: { id, companyId: req.user.companyId } });
      return res.status(200).json(updatedCommission);
    } catch (error) {
      console.error('Error updating commission:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Commission.destroy({
        where: { id, companyId: req.user.companyId },
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Commission not found' });
      }
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting commission:', error);
      return res.status(400).json({ error: error.message });
    }
  }
};
