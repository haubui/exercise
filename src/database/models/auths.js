'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class auths extends Model {
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
  auths.init(
    {
      user_id: DataTypes.INTEGER,
      user_token: DataTypes.TEXT,
      is_valid: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'auths',
    },
  );
  return auths;
};
