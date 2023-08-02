'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    const carTypes = [
      {
        type: 'Sport',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'SUV',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'MPV',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Sedan',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Coupe',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Hatchback',
        amount: '0',
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
