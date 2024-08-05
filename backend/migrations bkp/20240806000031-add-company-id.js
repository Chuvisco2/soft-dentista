'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Patients', 'companyId', {
      type: Sequelize.INTEGER,
      allowNull: true, // Inicialmente permitimos nulos para evitar erros
      references: {
        model: 'Companies',
        key: 'id',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Patients', 'companyId');
  }
};
