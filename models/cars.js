'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static associate(_models) {
      // this.belongsTo(_models.car_type, {as: 'CarType', foreignKey: 'car_type_id' })
    }
  }
  cars.init(
    {
      car_type_id: DataTypes.INTEGER,
      car_steering_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      car_description: DataTypes.STRING,
      capability: DataTypes.SMALLINT,
      gasoline: DataTypes.SMALLINT,
      average_rate: DataTypes.DECIMAL,
      amount_reviews: DataTypes.INTEGER,
      current_price: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'cars',
      // hooks: {
      //   afterCreate: (car, options) => {
      //     sequelize.query(
      //       'UPDATE car_types SET amount = (select count(*) from cars where car.car_type_id = car_types.id);',
      //     );
      //   },
      //   afterUpdate: (car, options) => {
      //     sequelize.query(
      //       'UPDATE car_types SET amount = (select count(*) from cars where car.car_type_id = car_types.id);',
      //     );
      //   },
      //   afterDestroy: (car, options) => {
      //     sequelize.query(
      //       'UPDATE car_types SET amount = (select count(*) from cars where car.car_type_id = car_types.id);',
      //     );
      //   },
      // },
    },
  );
  return cars;
};
