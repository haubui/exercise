'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    let payment_methods = [
      {
        payment_type: 'COD',
      },
      {
        payment_type: 'CreditCard',
      },
      {
        payment_type: 'PayPal',
      },
      {
        payment_type: 'BitCoin',
      },
    ];
    await queryInterface.bulkInsert('payment_methods', payment_methods, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('payment_methods', null, {});
  },
};
