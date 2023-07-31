'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_status extends Model {
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
  car_status.init(
    {
      status: DataTypes.STRING,
      car_id: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'car_status',
    },
  );
  return car_status;
};
