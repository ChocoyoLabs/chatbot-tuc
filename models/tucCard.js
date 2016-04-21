module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tucCards', {
    cardNumber: DataTypes.STRING,
    alias: DataTypes.STRING,
    deviceId: DataTypes.INTEGER,
  });
};
