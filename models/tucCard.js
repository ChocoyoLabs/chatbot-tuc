module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tucCards', {
    cardNumber: {
      type: DataTypes.STRING,
      unique: true,
    },
    alias: DataTypes.STRING,
    deviceId: {
      type: DataTypes.INTEGER,
    },
  });
};
