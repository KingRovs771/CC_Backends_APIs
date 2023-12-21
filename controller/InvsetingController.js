'use strict';

const response = require('../res');
const connection = require('../config/koneksi');

exports.index = function (req, res) {
  response.success('Aplikasi REST API GROW UMKM RUNNING', res);
};

//menampilkan semua data users
exports.eWallet = function (req, res) {
  connection.query('SELECT SUM(tbl_investor.final) as saldo FROM tbl_investor WHERE id_user = ?', [id_user], function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        rows[0].saldo = 0;
      } else {
        response.success(rows, res);
      }
    }
  });
};
