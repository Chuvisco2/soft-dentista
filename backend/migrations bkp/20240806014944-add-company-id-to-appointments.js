'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Appointments', 'companyId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Appointments', 'companyId');
  }
};
