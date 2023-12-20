'use strict';

const response = require('../res');
const connection = require('../config/koneksi');

exports.index = function (req, res) {
  response.success('Aplikasi REST API GROW UMKM RUNNING', res);
};

//menampilkan semua data users
exports.allUsers = function (req, res) {
  connection.query(
    'SELECT tbl_users.id_user, tbl_users.nama_lengkap, tbl_users.email, tbl_bank.id_bank, tbl_bank.nama_bank, tbl_provinsi.id_provinsi, tbl_provinsi.nama_provinsi FROM tbl_users INNER JOIN tbl_provinsi ON tbl_users.id_provinsi = tbl_provinsi.id_provinsi INNER JOIN tbl_bank ON tbl_users.id_bank = tbl_bank.id_bank',
    function (error, rows, fields) {
      if (error) {
        connection.log(error);
      } else {
        response.success(rows, res);
      }
    }
  );
};

//get Users By ID
exports.UsersById = function (req, res) {
  let id_users = req.params.id;
  connection.query('SELECT * FROM tbl_users WHERE id_user= ?', [id_users], function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.success(rows, res);
    }
  });
};

exports.RegisterUsers = function (req, res) {
  let id_provinsi = req.body.id_provinsi;
  let nik = req.body.nik;
  let nama_lengkap = req.body.nama_lengkap;
  let tgl_lahir = req.body.tgl_lahir;
  let no_hp = req.body.no_hp;
  let alamat = req.body.alamat;
  let email = req.body.email;
  let password = req.body.password;

  connection.query('INSERT INTO tbl_users () VALUES()');
};
