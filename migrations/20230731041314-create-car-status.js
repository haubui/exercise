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
          validate: {
            isBeforeEnd: function (value) {
              if (
                this.end_time !== null &&
                !isNaN(value) &&
                new Date(value) <= new Date()
              ) {
                throw new Error('Start time must be after the current time');
              }
              if (
                this.end_time !== null &&
                !isNaN(value) &&
                new Date(value) >= new Date(this.end_time)
              ) {
                throw new Error('Start time must be before end time');
              }
            },
          },
        },
        end_time: {
          allowNull: true,
          type: Sequelize.DATE,
          validate: {
            isAfterStart: function (value) {
              if (
                value !== null &&
                !isNaN(value) &&
                new Date(value) <= new Date()
              ) {
                throw new Error('End time must be after the current time');
              }
              if (
                value !== null &&
                this.start_time &&
                !isNaN(value) &&
                new Date(value) <= new Date(this.start_time)
              ) {
                throw new Error('End time must be after start time');
              }
            },
          },
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
