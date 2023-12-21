'use strict';

const response = require('../res');
const connection = require('../config/koneksi');

exports.index = function (req, res) {
  response.success('Aplikasi REST API GROW UMKM RUNNING', res);
};

//menampilkan semua data users
exports.allBank = function (req, res) {
  connection.query('SELECT * FROM tbl_bank', function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.success(rows, res);
    }
  });
};
