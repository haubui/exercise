'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class billing_infos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  billing_infos.init({
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.TEXT,
    town_city: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'billing_infos',
  });
  return billing_infos;
};