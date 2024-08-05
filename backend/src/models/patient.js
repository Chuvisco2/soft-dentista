'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.belongsTo(models.Company, { as: 'company', foreignKey: 'companyId' });
      Patient.hasMany(models.Appointment, { as: 'appointments', foreignKey: 'patientId' });
    }
  }
  Patient.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    type: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    lastVisit: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Patient',
  });
  return Patient;
};
