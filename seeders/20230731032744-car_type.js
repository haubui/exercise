'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    const carTypes = [
      {
        id: 1,
        type: 'Sport',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        type: 'SUV',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        type: 'MPV',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        type: 'Sedan',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        type: 'Coupe',
        amount: '0',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 6,
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
