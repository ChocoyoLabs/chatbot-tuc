'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('commands', [
      {
        pattern: 'saldo\\stuc',
        command: 'tuc.balance',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pattern: 'agregar\\starjeta\\stuc\\sde\\s(.+)\\s(\\d{8})',
        command: 'tuc.create',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pattern: 'agregar\\starjeta\\stuc\\s(\\d{8})\\sde\\s(.+)',
        command: 'tuc.create',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pattern: 'agregar\\stuc\\sde\\s(.+)\\s(\\d{8})',
        command: 'tuc.create',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pattern: 'agregar\\stuc\\s(\\d{8})\\sde\\s(.+)',
        command: 'tuc.create',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pattern: 'eliminar\\starjeta\\stuc\\s(\\d{8})',
        command: 'tuc.delete',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        pattern: 'eliminar\\stuc\\s(\\d{8})',
        command: 'tuc.delete',
        priority: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('commands', [
      {
        command:'tuc.balance',
      },
      {
        command:'tuc.create',
      },
      {
        command:'tuc.delete',
      },
    ], {});
  },
};
