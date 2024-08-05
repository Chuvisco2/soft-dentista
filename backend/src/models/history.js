// src/models/history.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class History extends Model {}

History.init({
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
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
  modelName: 'History',
});

module.exports = History;
