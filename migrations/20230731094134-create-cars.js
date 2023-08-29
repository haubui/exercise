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
          allowNull: true,
          type: Sequelize.DECIMAL(2, 1), // Changed the precision to (2, 1)
          defaultValue: 0,
          validate: {
            min: 1.0,
            max: 5.0,
          },
        },
        amount_reviews: {
          allowNull: true,
          type: Sequelize.INTEGER,
          defaultValue: 0,
        },
        current_price: {
          allowNull: true,
          type: Sequelize.DECIMAL(10, 2),
          defaultValue: 0.0,
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
        queryInterface.addIndex('cars', ['car_steering_id', 'name']);
        queryInterface.addIndex('cars', ['car_type_id', 'name']);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('cars');
  },
};
