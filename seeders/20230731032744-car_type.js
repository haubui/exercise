'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    const carTypes = [
      {
        type: 'SUV',
        amount: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'MPV',
        amount: '3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Sedan',
        amount: '5',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Coupe',
        amount: '2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Hatchback',
        amount: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('car_types', carTypes, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('car_types', null, {});
  },
};
