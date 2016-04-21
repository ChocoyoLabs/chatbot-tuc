# chatbot-tuc
TUC commands to check balance on Chocoyo Bot

Questions and Commands

**tuc.balance**

¿Cuál es mi saldo tuc?

**tuc.create**

Agregar tarjeta tuc de Juan Perez 00000000

Agregar tuc de Juan Perez 00000000

Agregar tuc 00000000 de Juan Perez

**tuc.delete**

Eliminar tarjeta tuc 00000000
Eliminar tuc 00000000

## Setup

### 1 - Install from github

    $ npm install ChocoyoLabs/chatbot-tuc --save

### 2 - Execute migration to create tucCards table

    $ sequelize db:migrate --migrations-path node_modules/chatbot-tuc/migrations

### 3 - Insert commands from seed

    $ sequelize db:seed --seeders-path node_modules/chatbot-tuc/seeders --seed chatbot-tuc-seeder.js

### 4 - Create command file

On chatbot project create file ./commands/tuc.js

    var tuc = require('chatbot-tuc');

    // exports
    exports.balance = tuc.balance;
    exports.create = tuc.create;
    exports.delete = tuc.delete;
