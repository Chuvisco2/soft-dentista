module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define('Patient', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('particular', 'convenio'),
      allowNull: false,
    }
  });

  Patient.associate = (models) => {
    Patient.hasMany(models.Appointment, { foreignKey: 'patientId', as: 'appointments' });
  };

  return Patient;
};
