'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cars.init({
    car_type_id: DataTypes.INTEGER,
    car_steering_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    car_description: DataTypes.STRING,
    capability: DataTypes.SMALLINT,
    gasoline: DataTypes.SMALLINT,
    average_rate: DataTypes.DECIMAL,
    amount_review: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'cars',
  });
  return cars;
};