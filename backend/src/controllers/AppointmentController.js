const { Appointment, Patient } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const appointmentData = {
        ...req.body,
        companyId: req.user.companyId,
      };
      const appointment = await Appointment.create(appointmentData);
      return res.status(201).json(appointment);
    } catch (error) {
      console.error('Error creating appointment:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const appointments = await Appointment.findAll({
        where: { companyId: req.user.companyId },
        include: [{ model: Patient, as: 'patient' }],
      });
      return res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findOne({
        where: { id, companyId: req.user.companyId },
        include: [{ model: Patient, as: 'patient' }],
      });
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      return res.status(200).json(appointment);
    } catch (error) {
      console.error('Error fetching appointment:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Appointment.update(req.body, {
        where: { id, companyId: req.user.companyId },
      });
      if (!updated) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      const updatedAppointment = await Appointment.findOne({
        where: { id, companyId: req.user.companyId },
        include: [{ model: Patient, as: 'patient' }],
      });
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      console.error('Error updating appointment:', error);
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Appointment.destroy({
        where: { id, companyId: req.user.companyId },
      });
      if (!deleted) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      return res.status(204).send();
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return res.status(400).json({ error: error.message });
    }
  }
};
