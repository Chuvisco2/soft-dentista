'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      Company.hasMany(models.Patient, { as: 'patients', foreignKey: 'companyId' });
      Company.hasMany(models.Appointment, { as: 'appointments', foreignKey: 'companyId' });
    }
  }
  Company.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};
