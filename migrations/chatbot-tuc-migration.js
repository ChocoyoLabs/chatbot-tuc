'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.createTable('tucCards', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cardNumber: {
        type: Sequelize.STRING,
        unique: true,
      },
      alias: Sequelize.STRING,
      deviceId: {
        type: Sequelize.INTEGER,
      },
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
