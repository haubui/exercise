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
      // define association here
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
      amount_review: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'cars',
      hooks: {
        afterCreate: (car, options) => {
          sequelize.query(
            'CREATE TRIGGER create_car_config AFTER INSERT ON cars FOR EACH ROW BEGIN UPDATE car_types SET amount = (select count(*) from cars where cars.car_type_id = car_types.id); END;',
          );
        },
        afterDestroy: (car, options) => {
          sequelize.query(
            'CREATE TRIGGER create_car_config AFTER DELETE ON cars FOR EACH ROW BEGIN UPDATE car_types SET amount = (select count(*) from cars where cars.car_type_id = car_types.id); END;',
          );
        },
      },
    },
  );
  return cars;
};
