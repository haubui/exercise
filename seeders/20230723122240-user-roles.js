'use strict';

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    const users = [
      {
        id: process.env.ADMIN_ROLE_ID.toString(),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: process.env.USER_ROLE_ID.toString(),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('user_roles', users, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};
