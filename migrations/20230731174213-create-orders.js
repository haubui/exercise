'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('orders', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        car_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        rental_info_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        billing_info_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        payment_method_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        order_status_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
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
        queryInterface.addIndex('orders', ['user_id']);
        queryInterface.addIndex('orders', ['car_id']);
        queryInterface.addIndex('orders', ['rental_info_id']);
        queryInterface.addIndex('orders', ['billing_info_id']);
        queryInterface.addIndex('orders', ['payment_method_id']);
        queryInterface.addIndex('orders', ['order_status_id']);
        queryInterface.addIndex('orders', [
          'user_id',
          'car_id',
          'rental_info_id',
          'billing_info_id',
          'payment_method_id',
          'order_status_id',
        ]);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
