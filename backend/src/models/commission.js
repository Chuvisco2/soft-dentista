'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commission extends Model {
    static associate(models) {
      Commission.belongsTo(models.Dentist, { as: 'dentist', foreignKey: 'dentistId' });
    }
  }
  Commission.init({
    amount: DataTypes.DECIMAL,
    date: DataTypes.DATE,
    dentistId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Commission',
  });
  return Commission;
};
