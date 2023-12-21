const connection = require('../config/koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const { query } = require('express');

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

exports.loginUser = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };

  let loginQuery = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
  let table = ['tbl_users', 'password', md5(post.password), 'email', post.email];

  loginQuery = mysql.format(loginQuery, table);
  connection.query(loginQuery, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          expiresIn: '24000000',
        });

        id_user = rows[0].id_user;

        let data = {
          id_user: id_user,
          acces_token: token,
          ip_address: ip.address(),
        };

        let queryUpdate = 'INSERT INTO ?? SET ?';
        let tableTbl = ['tbl_token'];

        queryUpdate = mysql.format(queryUpdate, tableTbl);
        connection.query(queryUpdate, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: 'true',
              message: 'Token Tergenerate',
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({
          Error: true,
          Message: 'Email atau Password nya Salah !!',
        });
      }
    }
  });
};
