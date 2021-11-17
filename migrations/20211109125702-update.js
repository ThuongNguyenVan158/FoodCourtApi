"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    // await queryInterface.addColumn("Orders", "payment_method", {
    //   type: Sequelize.STRING,
    // });
    await queryInterface.changeColumn("Food", "active", {
      type: Sequelize.BOOLEAN,
      default: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
