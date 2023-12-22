'use strict';

const { config } = require('../config/koneksi');

const secret_key = require('../config/secret');
const jwt = require('jsonwebtoken');
const verifikasi = require('../middleware/verifikasi');

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
  app.route('/registeruser').post(data.RegisterUsers);
  app.route('/loginuser').post(data.loginUser);
  app.route('/checkroute', verifikasi).get(data.checkRoute);
  //Umkm Route
  app.route('/umkm').get(umkm.AllUmkm);
  app.route('/umkm/:id').get(umkm.getUmkmById);
  app.route('/getuserview').get(umkm.getUserView);
  //Investor
  app.route('/ewallet', verifikasi).get(invest.eWallet);
  app.route('/topup', verifikasi).post(invest.TopUp);
  app.route('/purchase', verifikasi).post(invest.purchaseUmkm);
  //Dokumen

  //Userview

  //Provinsi
  app.route('/allprovinsi').get(provinsi.allProvinsi);
  //Sektor
  app.route('/allSektor').get(sektor.allSektor);
  //Bank
  app.route('/allbank').get(bank.allBank);
};
