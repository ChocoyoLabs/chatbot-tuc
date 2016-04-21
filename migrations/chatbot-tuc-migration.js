'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('tucCards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cardNumber: Sequelize.STRING,
      alias: Sequelize.STRING,
      deviceId: Sequelize.INTEGER,
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.dropTable('tucCards');
  },
};
