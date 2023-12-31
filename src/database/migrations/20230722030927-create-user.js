'use strict';
/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        role_id: {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: process.env.USER_ROLE_ID.toString(),
        },
        user_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        password: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        email: {
          allowNull: false,
          type: Sequelize.STRING,
          unique: true,
        },
        phone: {
          allowNull: true,
          type: Sequelize.STRING,
          unique: true,
        },
        address: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        town_city: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        country: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        avatar_url: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        work_title: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        is_active: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: true,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal(
            'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          ),
        },
      })
      .then(() => {
        queryInterface.addIndex('users', ['email']);
        queryInterface.addIndex('users', ['role_id', 'email', 'user_name']);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('users');
  },
};
