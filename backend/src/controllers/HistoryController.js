// src/controllers/HistoryController.js
const { History } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const history = await History.create(req.body);
      res.status(201).json(history);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async getByPatient(req, res) {
    try {
      const histories = await History.findAll({
        where: {
          patientId: req.params.patientId,
        },
      });
      res.status(200).json(histories);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
