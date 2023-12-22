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

  let query = 'SELECT email FROM ?? WHERE ??=?';
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

        id_user = rows[0].id_user;

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
  const id_user = req.auth.rows[0].id_user;
  res.json({ id_user });
};
exports.eWallet = function (req, res) {
  const id_user = req.auth.rows[0].id_user;

  // Query ke database untuk mendapatkan saldo dari e-wallet (contoh)
  const ewalletSql = 'SELECT IFNULL(SUM(tbl_investor.final), 0) as saldo FROM tbl_investor WHERE id_user = ?';
  connection.query(ewalletSql, [id_user], (err, results) => {
    if (err) {
      console.error('Error querying e-wallet in MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Memastikan bahwa results selalu memiliki elemen pertama, dan jika tidak, mengembalikan saldo 0
      const saldo_ewallet = results.length > 0 ? results[0].saldo : 0;
      const userId = req.userId;
      res.json({
        id_user: userId,
        saldo: saldo_ewallet,
      });
    }
  });
};
exports.topUpuser = function (req, res) {
  const { add } = req.body;
  const userId = req.auth.rows[0].id_user;

  // Pastikan nilai add positif (karena ini adalah topup)
  if (add <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0 for topup.' });
  }

  // Query untuk memasukkan data topup ke dalam tabel
  const insertTopupSql = 'INSERT INTO tbl_investor (id_user, type,`add`, final) SELECT ?, "Topup", ?, COALESCE(SUM(final), 0) + ? FROM tbl_investor WHERE id_user = ?';
  connection.query(insertTopupSql, [userId, add, add, userId], (err, result) => {
    if (err) {
      console.error('Error inserting topup data to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      console.log(err);
    } else {
      // Mengembalikan saldo terbaru setelah topup dari hasil query
      const saldo_ewallet = result.insertId ? add : 0;
      res.json({ saldo_ewallet });
    }
  });
};

exports.purchaseUmkm = function (req, res) {
  const { id_umkm, add } = req.body;
  const userId = req.auth.rows[0].id_user;

  // Pastikan nilai add positif (karena ini adalah purchase)
  if (add <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0 for purchase.' });
  }

  // Query untuk memasukkan data purchase ke dalam tabel
  const insertPurchaseSql = 'INSERT INTO tbl_investor (id_user, type,`add`, final) SELECT ?, "Purchase", ?, COALESCE(SUM(final), 0) - ? FROM tbl_investor WHERE id_user = ?';
  connection.query(insertPurchaseSql, [userId, id_umkm, add, add, userId], (err, result) => {
    if (err) {
      console.error('Error inserting purchase data to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Mengembalikan saldo terbaru setelah purchase dari hasil query
      const saldo_ewallet = result.insertId ? add : 0;

      // Update invest_amount di tbl_umkm
      const updateInvestAmountSql = ` UPDATE tbl_umkm SET invest_amount = invest_amount + ? WHERE id_umkm = ?`;
      connection.query(updateInvestAmountSql, [add, id_umkm], (err, updateResult) => {
        if (err) {
          console.error('Error updating invest_amount in tbl_umkm:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json({ saldo_ewallet });
        }
      });
    }
  });
};

exports.getUserById = function (req, res) {
  const id_user = req.auth.rows[0].id_user;
  let queryGet = 'SELECT * FROM ?? WHERE ?? =?';

  let table = ['tbl_users', 'id_user', id_user];

  queryGet = mysql.format(queryGet, table);
  connection.query(queryGet, function (error, result, fields) {
    if (error) {
    } else {
      res.status(200).json({
        error: 'false',
        message: 'Id user Berhasil ditemukan',
        rows: {
          id_user: id_user,
          nik: result[0].nik,
          nama_lengkap: result[0].nama_lengkap,
          email: result[0].email,
        },
      });
    }
  });
};
