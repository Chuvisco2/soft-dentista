'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    static associate(models) {
      Appointment.belongsTo(models.Patient, { as: 'patient', foreignKey: 'patientId' });
    }
  }
  Appointment.init({
    date: DataTypes.DATE,
    description: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Appointment',
  });
  return Appointment;
};
