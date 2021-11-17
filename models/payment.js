"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Customer }) {
      // define association here
      this.hasOne(Order, { foreignKey: "order_id" });
      this.belongsTo(Customer, { foreignKey: "customer_id" });
    }
  }
  Payment.init(
    {
      total_amount: DataTypes.INTEGER,
      paid_by: DataTypes.STRING,
      pay_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Payment",
    }
  );
  return Payment;
};
