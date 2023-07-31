'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rental_info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rental_info.init({
    pick_up_place: DataTypes.STRING,
    pick_up_date: DataTypes.DATE,
    drop_off_place: DataTypes.STRING,
    drop_off_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'rental_info',
  });
  return rental_info;
};