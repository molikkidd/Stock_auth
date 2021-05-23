'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.stock.belongsTo(models.user)
    }
  };
  stock.init({
    industry: DataTypes.STRING,
    ticker: DataTypes.STRING,
    price: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, 
  
  {
    sequelize,
    modelName: 'stock',
  });
  return stock;
};