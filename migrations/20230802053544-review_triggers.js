'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TRIGGER create_a_review AFTER INSERT ON reviews FOR EACH ROW BEGIN UPDATE cars SET amount_review = ( SELECT COUNT(*) FROM reviews WHERE cars.id = reviews.car_id), average_rate = ( SELECT SUM(rating) FROM reviews WHERE cars.id = reviews.car_id) / ( SELECT COUNT(*) FROM reviews WHERE cars.id = reviews.car_id ); END;
 `);
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_a_review AFTER UPDATE ON reviews FOR EACH ROW BEGIN UPDATE cars SET amount_review = ( SELECT COUNT(*) FROM reviews WHERE cars.id = reviews.car_id ), average_rate = ( SELECT SUM(rating) FROM reviews WHERE cars.id = reviews.car_id) / ( SELECT COUNT(*) FROM reviews WHERE cars.id = reviews.car_id ); END;
 `);
    await queryInterface.sequelize.query(`
    CREATE TRIGGER delete_a_review AFTER UPDATE ON reviews FOR EACH ROW BEGIN UPDATE cars SET amount_review = ( SELECT COUNT(*) FROM reviews WHERE cars.id = reviews.car_id ), average_rate = ( SELECT SUM(rating) FROM reviews WHERE cars.id = reviews.car_id ) / (SELECT COUNT(*) FROM reviews WHERE cars.id = reviews.car_id ); END;
 `);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS create_a_review ON reviews;
       `);
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS update_a_review ON reviews;
       `);
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS delete_a_review ON reviews;
       `);
  },
};
