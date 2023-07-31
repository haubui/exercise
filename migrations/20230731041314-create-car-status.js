'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('car_statuses', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        status: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        car_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        start_time: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        end_time: {
          allowNull: true,
          type: Sequelize.DATE,
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
        queryInterface.addIndex('car_statuses', ['car_id', 'status']);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('car_statuses');
  },
};
