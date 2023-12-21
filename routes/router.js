'use strict';

module.exports = function (app) {
  const data = require('../controller/UsersController');
  const umkm = require('../controller/UmkmController');

  app.route('/').get(data.index);

  //Users Route
  app.route('/users').get(data.allUsers);
  app.route('/users/:id').get(data.UsersById);
  // app.route('/register').post(data.RegisterUsers);

  //Umkm Route
  app.route('/umkm').get(umkm.AllUmkm);
  app.route('/umkm/:id').get(umkm.getUmkmById);

  //Investor

  //Provinsi

  //Dokuemn

  //Userview

  //Sektor

  //Bank
};
