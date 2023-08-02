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
        pick_up_place: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        drop_off_place: {
          allowNull: true,
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
        queryInterface.addIndex('car_statuses', ['car_id']);
        queryInterface.addIndex('car_statuses', ['car_id', 'status']);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('car_statuses');
  },
};
