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
        payment_method_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        order_status_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        pick_up_place: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        pick_up_date: {
          allowNull: false,
          type: Sequelize.DATE,
          validate: {
            isBeforeEnd: function (value) {
              if (
                this.drop_off_date !== null &&
                !isNaN(value) &&
                new Date(value) <= new Date()
              ) {
                throw new Error('pick_up_date must be after the current time');
              }
              if (
                this.drop_off_date !== null &&
                !isNaN(value) &&
                new Date(value) >= new Date(this.drop_off_date)
              ) {
                throw new Error('pick_up_date must be before drop_off_date');
              }
            },
          },
        },
        drop_off_place: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        drop_off_date: {
          allowNull: false,
          type: Sequelize.DATE,
          validate: {
            isAfterStart: function (value) {
              if (
                value !== null &&
                !isNaN(value) &&
                new Date(value) <= new Date()
              ) {
                throw new Error('drop_off_date must be after the current time');
              }
              if (
                value !== null &&
                this.pick_up_date &&
                !isNaN(value) &&
                new Date(value) <= new Date(this.pick_up_date)
              ) {
                throw new Error('drop_off_date must be after pick_up_date');
              }
            },
          },
        },
        billing_u_name: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        billing_u_phone: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        billing_u_address: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        billing_u_town_city: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        car_price_ordered: {
          allowNull: false,
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
        queryInterface.addIndex('orders', ['user_id']);
        queryInterface.addIndex('orders', ['car_id']);
        queryInterface.addIndex('orders', ['payment_method_id']);
        queryInterface.addIndex('orders', ['order_status_id']);
        queryInterface.addIndex('orders', [
          'user_id',
          'car_id',
          'payment_method_id',
          'order_status_id',
        ]);
        queryInterface.addIndex('orders', ['billing_u_name']);
        queryInterface.addIndex('orders', ['billing_u_phone']);
        queryInterface.addIndex('orders', ['billing_u_town_city']);
        queryInterface.addIndex('orders', [
          'billing_u_phone',
          'billing_u_town_city',
        ]);
      });
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('orders');
  },
};
