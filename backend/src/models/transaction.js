'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.Company, { as: 'company', foreignKey: 'companyId' });
      Transaction.belongsTo(models.Patient, { as: 'patient', foreignKey: 'patientId' });
    }
  }
  Transaction.init({
    amount: DataTypes.DECIMAL,
    type: DataTypes.STRING,
    description: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
    patientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};
