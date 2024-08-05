// src/models/prescription.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Prescription extends Model {}

Prescription.init({
  medication: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dosage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Patients',
      key: 'id',
    },
  },
}, {
  sequelize,
  modelName: 'Prescription',
});

module.exports = Prescription;
