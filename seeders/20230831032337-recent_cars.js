'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(_queryInterface, _Sequelize) {
    // await queryInterface.bulkInsert('recent_cars', array_recent_cars, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('recent_cars', null, {});
  },
};
