const { Model, DataTypes } = require('sequelize');

class Dentist extends Model {
  static init(sequelize) {
    return super.init({
      name: DataTypes.STRING,
      specialty: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'Dentist',
      tableName: 'dentists', // Adicionando o nome da tabela explícito
    });
  }

  static associate(models) {
    this.hasMany(models.Commission, { as: 'commissions', foreignKey: 'dentistId' });
  }
}

module.exports = Dentist;
