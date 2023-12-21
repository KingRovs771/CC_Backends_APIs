const connection = require('../config/koneksi');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');
const { query } = require('express');
const { use } = require('.');

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

// exports.loginUser = function (req, res) {
//   const { email, password } = req.body;

//   // Query ke database untuk mendapatkan informasi pengguna berdasarkan email
//   const sql = 'SELECT * FROM tbl_users WHERE email = ?';
//   connection.query(sql, [email], (err, results) => {
//     if (err) {
//       console.error('Error querying MySQL:', err);
//       res.status(500).json({ error: 'Internal Server Error' });
//     } else if (results.length === 0) {
//       res.status(401).json({ error: 'Invalid email or password' });
//     } else {
//       const user = results[0];

//       // Membandingkan password yang di-hash dengan password di database
//       if (user.password === md5(password)) {
//         // Menghasilkan token
//         const token = jwt.sign({ id_user: user.id_user }, 'akusayangkamuloh', { expiresIn: '1h' });

//         // Menyimpan token ke dalam kolom 'token' di database
//         const updateTokenSql = 'UPDATE tbl_users SET token = ? WHERE id_user = ?';
//         connection.query(updateTokenSql, [token, user.id_user], (err) => {
//           if (err) {
//             console.error('Error updating token in MySQL:', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//           } else {
//             res.json({ token });
//           }
//         });
//       } else {
//         res.status(401).json({ error: 'Invalid email or password' });
//       }
//     }
//   });
// };
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
  const id_user = req.id_user;
  res.json({ id_user });
};
