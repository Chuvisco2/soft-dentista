module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define('Appointment', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    patientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Patients', // refere-se à tabela de pacientes
        key: 'id',
      },
    },
  });

  Appointment.associate = (models) => {
    Appointment.belongsTo(models.Patient, { foreignKey: 'patientId', as: 'patient' });
  };

  return Appointment;
};
