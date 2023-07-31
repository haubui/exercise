'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('billing_infos', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        phone: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        address: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        town_city: {
          allowNull: false,
          type: Sequelize.STRING,
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
        queryInterface.addIndex('billing_infos', ['name']);
        queryInterface.addIndex('billing_infos', ['phone']);
        queryInterface.addIndex('billing_infos', ['town_city']);
        queryInterface.addIndex('billing_infos', ['phone', 'town_city']);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('billing_infos');
  },
};
