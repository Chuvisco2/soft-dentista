const { Quote } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const quote = await Quote.create({ ...req.body, companyId: req.user.companyId });
      return res.status(201).json(quote);
    } catch (error) {
      console.error('Error creating quote:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getByPatient(req, res) {
    try {
      const quotes = await Quote.findAll({
        where: { patientId: req.params.patientId, companyId: req.user.companyId },
      });
      return res.status(200).json(quotes);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return res.status(400).json({ error: error.message });
    }
  },
};
