const { Appointment } = require('../models');

module.exports = {
  async create(req, res) {
    try {
      const appointment = await Appointment.create(req.body);
      return res.status(201).json(appointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const appointments = await Appointment.findAll();
      return res.status(200).json(appointments);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      return res.status(200).json(appointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const [updated] = await Appointment.update(req.body, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      const updatedAppointment = await Appointment.findByPk(id);
      return res.status(200).json(updatedAppointment);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Appointment.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Appointment not found' });
      }
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};
