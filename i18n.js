var util = require('util');

/**
 * Format recursive to all texts
 */
exports.format = function () {
  var text = null;
  var isJson = true;
  try {
    JSON.parse(arguments[0]);
  } catch (e) {
    isJson = false;
  }

  if (isJson) {
    text = JSON.stringify(arguments[0]);
  } else {
    text = arguments[0];
  }

  var params = Array.prototype.slice.call(arguments);
  params.shift();
  params.unshift(text);

  if (isJson) {
    return JSON.parse(util.format.apply(util, params));
  } else {
    return util.format.apply(util, params);
  }
};

/**
 * Language texts
 */
module.exports.lang = {
  tuc: {
    balance: {
      empty: [
        {
          text: 'Aún no has registrado tus tarjetas TUC.',
        },
        {
          text: 'Para agregar una tarjeta TUC escribí lo siguiente:',
        },
        {
          text: 'Agregar tarjeta tuc de Juan Perez 00000000',
          bold: true,
          italic: true,
        },
        {
          text: 'Recordá reemplazar "<b>Juan Perez</b>" por tu nombre o el nombre del dueño de la tarjeta y "<b>00000000</b>" por el número de la tarjeta TUC.',
        },
      ],
      done: {
        text: 'La tarjeta TUC %s de %s tiene C$%s de saldo.',
      },
    },
    create: {
      duplicate: {
        text: 'Ya registraste una tarjeta TUC con el número %s.',
      },
    },
    delete: {
      notFound: {
        text: '¿Estás seguro que la tarjeta Tuc %s ya la habías registrado?. Te lo digo por que no la encuentro en mi base de datos.',
      },
      done: {
        text: 'Eliminé la tarjeta Tuc %s. Ya no me podras consultar el saldo de esa tarjeta.',
      },
    },
  },
};
