'use strict';

const response = require('../res');
const connection = require('../config/koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const { query } = require('express');

exports.index = function (req, res) {
  response.success('Aplikasi REST API GROW UMKM RUNNING', res);
};

//menampilkan semua data users
exports.allUsers = function (req, res) {
  connection.query(
    'SELECT tbl_users.id_user, tbl_users.nama_lengkap, tbl_users.email, tbl_provinsi.id_provinsi, tbl_provinsi.nama_provinsi FROM tbl_users INNER JOIN tbl_provinsi ON tbl_users.id_provinsi = tbl_provinsi.id_provinsi',
    function (error, rows, fields) {
      if (error) {
        console.log(error);
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
        response.success('Email Sudah Terdaftar', res);
      }
    }
  });
};

exports.loginUser = function (req, res) {
  var post = {
    password: req.body.password,
    email: req.body.email,
  };

  var query = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
  var table = ['tbl_users', 'password', md5(post.password), 'email', post.email];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, {
          //ubah expires dalam ms
          expiresIn: '2400000',
        });

        let id_user = rows[0].id_user;

        var expired = 2400000;

        var data = {
          id_user: id_user,
          access_token: token,
          ip_address: ip.address(),
        };

        var query = 'INSERT INTO ?? SET ?';
        var table = ['tbl_token'];

        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: 'Token JWT tergenerate!',
              token: token,
              //4 tambahkan expired time
              expires: expired,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({ Error: true, Message: 'Email atau password salah!' });
      }
    }
  });
};

exports.checkRoute = function (req, res) {
  const id_user = req.auth;
  res.json({ id_user });
};
