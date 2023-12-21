const connection = require('../config/koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

exports.registerUser = function (req, res) {
  let post = {
    id_provinsi: req.body.id_provinsi,
    nik: req.body.nik,
    nama_lengkap: req.body.nama_lengkap,
    tgl_lahir: req.body.tgl_lahir,
    no_hp: req.body.no_hp,
    alamat: req.body.alamat,
    email: req.body.email,
    password: md5(req.body.password),
  };

  let query = 'SELECT email FROM ?? WHERE ??';
  let table = ['tbl_users', 'email', post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        let query = 'INSERT INTO ?? SET ?';
        let table = ['tbl_users'];

        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.success('Berhasil Menambahkan Data User Baru', res);
          }
        });
      } else {
        response.success('Email Sudah Terdaftar');
      }
    }
  });
};
