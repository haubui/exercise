'use strict';
var saltRounds = 10;
// eslint-disable-next-line @typescript-eslint/no-var-requires
var bcrypt = require('bcrypt');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD.toString(),
      saltRounds,
    );
    const hashedUserPassword = await bcrypt.hash(
      process.env.USER_TEST_PASSWORD.toString(),
      saltRounds,
    );
    const hashedDeveloperPassword = await bcrypt.hash(
      process.env.DEVERLOPER_PASSWORD.toString(),
      saltRounds,
    );
    const users = [
      {
        role_id: process.env.ADMIN_ROLE_ID.toString(),
        user_name: 'admin',
        work_title: 'Admin Rental Car System',
        password: hashedPassword,
        email: 'admin_rental@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: process.env.USER_ROLE_ID.toString(),
        user_name: 'user_rental',
        work_title: 'User Rental Car System',
        password: hashedUserPassword,
        email: 'user_rental@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        role_id: process.env.USER_ROLE_ID.toString(),
        user_name: 'developer_rental',
        work_title: 'Developer Rental Car System',
        password: hashedDeveloperPassword,
        email: 'developer_rental@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('users', users, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
