'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user_role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user_role.init(
    {
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'user_role',
    },
  );
  return user_role;
};
