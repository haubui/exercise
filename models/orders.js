'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
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
  orders.init(
    {
      user_id: DataTypes.INTEGER,
      car_id: DataTypes.INTEGER,
      payment_method_id: DataTypes.INTEGER,
      order_status_id: DataTypes.INTEGER,
      pick_up_place: DataTypes.STRING,
      pick_up_date: DataTypes.DATE,
      drop_off_place: DataTypes.STRING,
      drop_off_date: DataTypes.DATE,
      billing_u_name: DataTypes.STRING,
      billing_u_phone: DataTypes.STRING,
      billing_u_address: DataTypes.TEXT,
      billing_u_town_city: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'orders',
    },
  );
  return orders;
};
