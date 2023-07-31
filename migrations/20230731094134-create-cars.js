'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('cars', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        car_type_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        car_steering_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        car_description: {
          allowNull: false,
          type: Sequelize.STRING,
          defaultValue: '',
        },
        capability: {
          allowNull: false,
          type: Sequelize.SMALLINT,
          defaultValue: 4,
        },
        gasoline: {
          allowNull: false,
          type: Sequelize.SMALLINT,
          defaultValue: 70,
        },
        average_rate: {
          allowNull: false,
          type: Sequelize.DECIMAL(1, 1),
          defaultValue: 0.0,
        },
        amount_review: {
          allowNull: false,
          type: Sequelize.INTEGER,
          defaultValue: 0,
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
        queryInterface.addIndex('cars', ['car_type_id']);
        queryInterface.addIndex('cars', ['car_steering_id']);
        queryInterface.addIndex('cars', ['car_steering_id', 'car_type_id']);
        queryInterface.addIndex('cars', [
          'car_steering_id',
          'car_type_id',
          'name',
        ]);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('cars');
  },
};
