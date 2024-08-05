const { Prescription } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const prescription = await Prescription.create({ ...req.body, companyId: req.user.companyId });
      return res.status(201).json(prescription);
    } catch (error) {
      console.error('Error creating prescription:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getByPatient(req, res) {
    try {
      const prescriptions = await Prescription.findAll({
        where: { patientId: req.params.patientId, companyId: req.user.companyId },
      });
      return res.status(200).json(prescriptions);
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      return res.status(400).json({ error: error.message });
    }
  },
};
