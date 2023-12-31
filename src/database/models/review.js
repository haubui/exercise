'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class review extends Model {
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
  review.init(
    {
      car_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
      rating: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: 'review',
    },
  );
  return review;
};
