"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Customer, Food }) {
      // define association here
      this.belongsTo(Customer, { foreignKey: "customer_id" });
      this.belongsTo(Food, { foreignKey: "food_id" });
    }
  }
  Feedback.init(
    {
      rating: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      date_recorded: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Feedback",
    }
  );
  return Feedback;
};
