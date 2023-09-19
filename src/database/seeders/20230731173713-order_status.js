'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    const order_statuses = [
      {
        status: 'PENDING',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'DONE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        status: 'CANCELLED',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('order_statuses', order_statuses, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('order_statuses', null, {});
  },
};
