"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderItem, Feedback, category }) {
      // define association here
      this.hasMany(Feedback, { foreignKey: "food_id" });
      this.hasMany(OrderItem, { foreignKey: "food_id" });
      this.belongsTo(category, { foreignKey: "category_id" });
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      food_img: DataTypes.STRING,
      quantity_order: DataTypes.INTEGER,
      /*
      status:DataTypes.STRING
      */
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
