'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_status extends Model {
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
  order_status.init(
    {
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'order_status',
    },
  );
  return order_status;
};
