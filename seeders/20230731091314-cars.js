'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    let listCars = [];
    var carNames = [
      'Koenigsegg',
      'Nissan GT - R',
      'Rolls-Royce',
      'All New Rush',
      'CR - V',
      'All New Terios',
      'MG ZX Exclusice',
      'New MG ZS',
      'MG ZX Excite',
    ];
    var typeCarTextes = ['Sport', 'SUV', 'MPV', 'Sedan', 'Coupe', 'Hatchback'];
    var typeCarEngineTextes = ['Manual', 'Automatic'];

    for (let i = 0; i < 200; i++) {
      var randomCarNameIndex = Math.floor(Math.random() * carNames.length);
      var typeCar = Math.floor(getRandomNumber(1, 7));
      var typeCarEngine = Math.floor(getRandomNumber(1, 3));
      var typeCarText = typeCarTextes[typeCar];
      var typeCarEngineText = typeCarEngineTextes[typeCarEngine];
      var capabilityCar = Math.floor(getRandomNumber(4, 13));
      var gasolineCar = Math.floor(getRandomNumber(20, 200));
      const aCar = {
        id: i + 1,
        car_type_id: typeCar,
        car_steering_id: typeCarEngine,
        name: carNames[randomCarNameIndex],
        car_description: `The best ${carNames[randomCarNameIndex]} ever! Model ${typeCarText} and with engine ${typeCarEngineText} are awsome! It have capability with ${capabilityCar} people and gasoline size about ${gasolineCar} galon. So cool!`,
        capability: capabilityCar,
        gasoline: gasolineCar,
        current_price: 0,
      };
      listCars.push(aCar);
    }

    const carImages = [];
    const carPrices = [];
    const carStatuses = [];
    listCars.forEach((car) => {
      var aImage = {
        car_id: car.id,
        url: `resouces/cars/${car.id}.png`,
        order: car.id,
      };
      var aPrice = {
        car_id: car.id,
        price_rent_per_day: Math.round(getRandomNumber(60, 200) * 100) / 100,
      };
      car.current_price = aPrice.price_rent_per_day;
      carImages.push(aImage);
      carPrices.push(aPrice);
      var aCarStatus = {
        car_id: car.id,
        status: 'AVAILABLE',
        start_time: new Date(),
      };
      carStatuses.push(aCarStatus);
    });
    await queryInterface.bulkInsert('cars', listCars, {});
    await queryInterface.bulkInsert('car_images', carImages, {});
    await queryInterface.bulkInsert('car_prices', carPrices, {});
    await queryInterface.bulkInsert('car_statuses', carStatuses, {});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('cars', null, {});
  },
};

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
