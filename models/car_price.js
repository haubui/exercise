'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_price extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  car_price.init({
    car_id: DataTypes.INTEGER,
    price_rent_per_day: DataTypes.DECIMAL,
    discount_price: DataTypes.DECIMAL,
    discount_until: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'car_price',
  });
  return car_price;
};