'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('car_prices', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        car_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        price_rent_per_day: {
          allowNull: false,
          type: Sequelize.DECIMAL(10, 2),
        },
        discount_price: {
          allowNull: true,
          type: Sequelize.DECIMAL(10, 2),
        },
        discount_until: {
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
        queryInterface.addIndex('car_prices', ['car_id']);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('car_prices');
  },
};
