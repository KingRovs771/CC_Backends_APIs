'use strict';

const { config } = require('../config/koneksi');

const secret_key = require('../config/secret');
const jwt = require('jsonwebtoken');

module.exports = function (app) {
  const data = require('../controller/UsersController');
  const umkm = require('../controller/UmkmController');
  const bank = require('../controller/BankController');
  const sektor = require('../controller/SektorController');
  const provinsi = require('../controller/ProvinsiController');
  const invest = require('../controller/InvsetingController');

  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(403).json({ error: 'Token is required' });
    }

    jwt.verify(token, secret_key.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      req.userId = decoded.id_user;
      next();
    });
  };

  //Route Utama
  app.route('/').get(data.index);

  //Users Route
  app.route('/users').get(data.allUsers);
  app.route('/users/:id').get(data.UsersById);

  //Umkm Route
  app.route('/umkm').get(umkm.AllUmkm);
  app.route('/umkm/:id').get(umkm.getUmkmById);

  //Investor
  app.route('/ewallet', verifyToken).get(invest.eWallet);
  app.route('/topup', verifyToken).post(invest.TopUp);
  app.route('/purchase', verifyToken).post(invest.purchaseUmkm);
  //Dokumen

  //Userview

  //Provinsi
  app.route('/allprovinsi').get(provinsi.allProvinsi);
  //Sektor
  app.route('/allSektor').get(sektor.allSektor);
  //Bank
  app.route('/allbank').get(bank.allBank);
};
