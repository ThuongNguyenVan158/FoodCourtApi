"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Feedback, Order, Payment }) {
      // define association here
      this.hasMany(Feedback, { foreignKey: "customer_id" });
      this.hasMany(Order, { foreignKey: "customer_id" });
      this.hasMany(Payment, { foreignKey: "customer_id" });
    }
  }
  Customer.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      username: DataTypes.STRING,
       /* 
      birthdate:pay_date: DataTypes.DATE,
      male:DataTypes.STRING,
      address:DataTypes.STRING,
  */
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
