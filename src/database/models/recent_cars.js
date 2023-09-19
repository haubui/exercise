'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class recent_cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recent_cars.init({
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'recent_cars',
  });
  return recent_cars;
};