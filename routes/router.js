'use strict';

module.exports = function (app) {
  const data = require('../controller/UsersController');
  const umkm = require('../controller/UmkmController');
  const bank = require('../controller/BankController');
  const sektor = require('../controller/SektorController');
  const provinsi = require('../controller/ProvinsiController');
  const invest = require('../controller/InvsetingController');

  //Route Utama
  app.route('/').get(data.index);

  //Users Route
  app.route('/users').get(data.allUsers);
  app.route('/users/:id').get(data.UsersById);

  //Umkm Route
  app.route('/umkm').get(umkm.AllUmkm);
  app.route('/umkm/:id').get(umkm.getUmkmById);

  //Investor
  app.route('/ewallet').get(invest.eWallet);
  //Dokumen

  //Userview

  //Provinsi
  app.route('/allprovinsi').get(provinsi.allProvinsi);
  //Sektor
  app.route('/allSektor').get(sektor.allSektor);
  //Bank
  app.route('/allbank').get(bank.allBank);
};
