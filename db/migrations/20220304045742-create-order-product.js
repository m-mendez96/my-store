'use strict';

const { OrderProductSchema, ORDER_PRODDUCT_TABLE } = require('./../models/order-product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_PRODDUCT_TABLE, OrderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODDUCT_TABLE);
  }
};
