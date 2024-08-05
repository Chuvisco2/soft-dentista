// src/controllers/PatientController.js
const { Patient } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const patient = await Patient.create(req.body);
      return res.status(201).json(patient);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const patients = await Patient.findAll();
      return res.status(200).json(patients);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(id);
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(200).json(patient);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Patient.update(req.body, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      const updatedPatient = await Patient.findByPk(id);
      return res.status(200).json(updatedPatient);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Patient.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
