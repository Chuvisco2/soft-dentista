const { Patient } = require('../models');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

module.exports = {
  async create(req, res) {
    try {
      const patientData = {
        ...req.body,
        companyId: req.user.companyId,
      };
      const patient = await Patient.create(patientData);
      return res.status(201).json(patient);
    } catch (error) {
      console.error('Error creating patient:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const patients = await Patient.findAll({ where: { companyId: req.user.companyId } });
      return res.status(200).json(patients);
    } catch (error) {
      console.error('Error fetching patients:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const patient = await Patient.findOne({ where: { id, companyId: req.user.companyId } });
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(200).json(patient);
    } catch (error) {
      console.error('Error fetching patient:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Patient.update(req.body, {
        where: { id, companyId: req.user.companyId },
      });
      if (!updated) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      const updatedPatient = await Patient.findOne({ where: { id, companyId: req.user.companyId } });
      return res.status(200).json(updatedPatient);
    } catch (error) {
      console.error('Error updating patient:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Patient.destroy({
        where: { id, companyId: req.user.companyId },
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting patient:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async importPatients(req, res) {
    try {
      const results = [];
      fs.createReadStream(path.join(__dirname, '..', 'uploads', 'patients.csv'))
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
          for (const patientData of results) {
            await Patient.create(patientData);
          }
          res.status(200).json({ message: 'Patients imported successfully!' });
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
