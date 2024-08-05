'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Quote extends Model {
    static associate(models) {
      Quote.belongsTo(models.Patient, { as: 'patient', foreignKey: 'patientId' });
    }
  }
  Quote.init({
    description: DataTypes.STRING,
    amount: DataTypes.DECIMAL,
    patientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Quote',
  });
  return Quote;
};
