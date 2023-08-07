'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class car_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static associate(_models) {
      // define association here
      this.hasMany(_models.cars, { as: 'cars', foreignKey: 'car_type_id' });
    }
    // User.associate = function(models) {
    //   User.hasMany(models.Tour, {as: 'Tours', foreignKey: 'userId'});
    // };
  }
  car_type.init(
    {
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'car_type',
    },
  );
  return car_type;
};
