'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async up(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE TRIGGER create_an_order AFTER INSERT ON orders FOR EACH ROW BEGIN INSERT INTO car_statuses (status, car_id, start_time, end_time, pick_up_place, drop_off_place) VALUES('PENDING', orders.car_id, orders.pick_up_date, orders.drop_off_date, orders.pick_up_place, orders.drop_off_place); END;
 `);
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_an_order_status_done AFTER UPDATE ON orders FOR EACH ROW BEGIN IF NEW.order_status_id = 'DONE' AND OLD.order_status_id = 'PENDING' THEN UPDATE car_statuses SET status = 'DONE' WHERE car_id = NEW.car_id AND start_time = NEW.pick_up_date AND end_time = NEW.drop_off_date; END IF; END;
 `);
    await queryInterface.sequelize.query(`
    CREATE TRIGGER update_an_order_status_canceled AFTER UPDATE ON orders FOR EACH ROW BEGIN IF NEW.order_status_id = 'CANCELED' AND OLD.order_status_id = 'PENDING' THEN UPDATE car_statuses SET status = 'AVAILABLE' WHERE car_id = NEW.car_id AND start_time = NEW.pick_up_date AND end_time = NEW.drop_off_date; END IF; END;
 `);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async down(queryInterface, _Sequelize) {
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS create_an_order ON orders;
       `);
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS update_an_order_status_done ON orders;
       `);
    await queryInterface.sequelize.query(`
         DROP TRIGGER IF EXISTS update_an_order_status_done ON orders;
       `);
  },
};
