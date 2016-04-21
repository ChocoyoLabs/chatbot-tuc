var debug = require('debug')('chocoyobot:command:tuc');
var DeviceModel = require('../../../models').devices;
var TucCardModel = require('../models').tucCards;
var i18n = require('../i18n');
var async = require('async');
var Tuc = require('tuc');
var tuc = new Tuc();
var toTitleCase = require('titlecase');

DeviceModel.hasMany(TucCardModel);

/**
* Balance from all tuc cards
*/
function balance(device, match, callback) {
  device
  .getTucCards({
    raw: true,
  })
  .then(function (tucCards) {
    if (tucCards.length === 0) {
      debug('Dont have TUC Cards');

      // empty tucs
      callback(i18n.lang.tuc.balance.empty);
    } else {
      // each cards and create list of numbers
      var tucCardNumberList = [];
      tucCards.forEach(function (tucCard) {
        tucCardNumberList.push(tucCard.cardNumber);
      });

      var resultBalances = [];
      async.forEachOf(tucCardNumberList, function (value, key, cb) {
        console.log(key);
        tuc.getBalance(value, function (resultBalance) {
          if (resultBalance.hasOwnProperty('error')) {
            resultBalances.push({
              text: resultBalance.error.message,
            });
          } else {
            resultBalances.push({
              text: i18n.format(i18n.lang.tuc.balance.done.text, tucCards[key].cardNumber, toTitleCase(tucCards[key].alias), resultBalance),
            });
          }

          // execute callback to next
          cb();
        });
      }, function (err) {

        if (err) console.error(err.message);

        debug('Show TUC Cards balance');

        // configs is now a map of JSON data
        callback(resultBalances);
      });
    }
  })
  .catch(function (error) {
    debug('Error on query getTucCards from device');
    callback(error);
  });
};

/**
* Create new card
*/
function createRow(device, match, callback) {

  // regular expresion for tuc format
  var patternCardNumber = new RegExp(/\d{8}/i);

  var cardNumber = '';
  var alias = '';

  if (patternCardNumber.test(match[1])) {
    cardNumber = match[1];
    alias = match[2];
  } else {
    alias = match[1];
    cardNumber = match[2];
  }

  // find tuc card based cardNumber
  TucCardModel.findOne({
    where: {
      cardNumber: cardNumber,
      deviceId: device.id,
    },
  }).then(function (tucCard) {
    if (tucCard) {
      debug('Duplicated Tuc Card %s', cardNumber);

      var response = [];

      response.push({
        text: i18n.format(i18n.lang.tuc.create.duplicate.text, cardNumber),
      });

      // tuc card exists
      callback(response);
    } else {
      // create tucCard
      TucCardModel.create({
        cardNumber: cardNumber,
        alias: alias,
        deviceId: device.id,
      }).then(function (tucCards) {
        // call balance metehod
        balance(device, null, callback);
      })
      .catch(function (error) {
        callback(error);
      });
    }
  }).catch(function (error) {
    callback(error);
  });
};

/**
* Delete card
*/
function deleteRow(device, match, callback) {
  var cardNumber = match[1];

  // find tuc card based cardNumber
  TucCardModel.destroy({
    where: {
      cardNumber: cardNumber,
      deviceId: device.id,
    },
  }).then(function (affectedRows) {
    if (affectedRows === 1) {
      debug('Tuc Card %s deleted', cardNumber);

      var response = [];

      response.push({
        text: i18n.format(i18n.lang.tuc.delete.done.text, cardNumber),
      });

      // tuc card deleted
      callback(response);
    } else {
      debug('Tuc Card %s don\'t exists', cardNumber);

      var response = [];

      response.push({
        text: i18n.format(i18n.lang.tuc.delete.notFound.text, cardNumber),
      });

      // tuc card don't exists
      callback(response);
    }
  }).catch(function (error) {
    callback(error);
  });
};

// exports
exports.balance = balance;
exports.create = createRow;
exports.delete = deleteRow;
