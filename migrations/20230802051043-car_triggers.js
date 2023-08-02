'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TRIGGER create_car_config AFTER INSERT ON cars FOR EACH ROW BEGIN UPDATE car_types SET amount = (select count(*) from cars where cars.car_type_id = car_types.id); END;
 `);
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_car_config AFTER UPDATE ON cars FOR EACH ROW BEGIN UPDATE car_types SET amount = (select count(*) from cars where cars.car_type_id = car_types.id); END;
 `);
    await queryInterface.sequelize.query(`
    CREATE TRIGGER delete_car_config AFTER DELETE ON cars FOR EACH ROW BEGIN UPDATE car_types SET amount = (select count(*) from cars where cars.car_type_id = car_types.id); END;
 `);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS create_car_config ON cars;
       `);
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS update_car_config ON cars;
       `);
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS delete_car_config ON cars;
       `);
  },
};
