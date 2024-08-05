const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const Patient = require('./patient')(sequelize, DataTypes);
const Appointment = require('./appointment')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);

const db = {
  sequelize,
  Sequelize,
  Patient,
  Appointment,
  Transaction,
};

module.exports = db;
