// models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

// Importar modelos
const Patient = require('./patient')(sequelize, DataTypes);
const Appointment = require('./appointment')(sequelize, DataTypes);
const Transaction = require('./transaction')(sequelize, DataTypes);
const Company = require('./company')(sequelize, DataTypes);
const User = require('./User'); // Corrigido

// Associar modelos
Patient.associate = (models) => {
  Patient.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
  Patient.hasMany(models.Transaction, { foreignKey: 'patientId', as: 'transactions' });
  Patient.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
};

Appointment.associate = (models) => {
  Appointment.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  Appointment.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
};

Transaction.associate = (models) => {
  Transaction.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  Transaction.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
};

Company.associate = (models) => {
  Company.hasMany(models.Appointment, { foreignKey: 'companyId', as: 'appointments' });
  Company.hasMany(models.Transaction, { foreignKey: 'companyId', as: 'transactions' });
  Company.hasMany(models.Patient, { foreignKey: 'companyId', as: 'patients' });
};

// Adicione a associação do modelo User
User.associate = (models) => {
  User.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
};

// Configurar associações
const db = {
  sequelize,
  Sequelize,
  Patient,
  Appointment,
  Transaction,
  Company,
  User, // Adicione esta linha
};

// Chamar associações
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
