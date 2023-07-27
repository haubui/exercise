'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
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
  user.init(
    {
      role_id: DataTypes.STRING,
      user_name: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING,
      town_city: DataTypes.STRING,
      country: DataTypes.STRING,
      avatar_url: DataTypes.STRING,
      work_title: DataTypes.STRING,
      is_active: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
