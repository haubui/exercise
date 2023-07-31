'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER,
    rental_info_id: DataTypes.INTEGER,
    billing_info_id: DataTypes.INTEGER,
    payment_method_id: DataTypes.INTEGER,
    order_status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'orders',
  });
  return orders;
};