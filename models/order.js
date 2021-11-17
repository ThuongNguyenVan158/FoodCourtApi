"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ OrderItem, Customer, Payment }) {
      // define association here
      this.hasMany(OrderItem, { foreignKey: "order_id" });
      this.belongsTo(Customer, { foreignKey: "customer_id" });
      this.belongsTo(Payment, { foreignKey: "payment_id" });
    }
  }
  Order.init(
    {
      order_date: DataTypes.DATE,
      total_amount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
