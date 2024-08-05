'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      UPDATE "Patients"
      SET "companyId" = (SELECT "id" FROM "Companies" LIMIT 1)
      WHERE "companyId" IS NULL
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      UPDATE "Patients"
      SET "companyId" = NULL
      WHERE "companyId" = (SELECT "id" FROM "Companies" LIMIT 1)
    `);
  }
};
