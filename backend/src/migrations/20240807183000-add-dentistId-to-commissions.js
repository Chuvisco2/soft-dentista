'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Commissions');
    if (!table.dentistId) {
      await queryInterface.addColumn('Commissions', 'dentistId', {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Dentists',
          key: 'id',
        },
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    const table = await queryInterface.describeTable('Commissions');
    if (table.dentistId) {
      await queryInterface.removeColumn('Commissions', 'dentistId');
    }
  }
};
