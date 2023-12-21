'use strict';

const response = require('../res');
const connection = require('../config/koneksi');

exports.index = function (req, res) {
  response.success('Aplikasi REST API GROW UMKM RUNNING', res);
};

//menampilkan semua data users
exports.eWallet = function (req, res) {
  const id_user = req.auth.id_user;

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

exports.TopUp = function (req, res) {
  const { add } = req.body;
  const userId = req.auth.id_user;

  // Pastikan nilai add positif (karena ini adalah topup)
  if (add <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0 for topup.' });
  }

  // Query untuk memasukkan data topup ke dalam tabel
  const insertTopupSql = `
    INSERT INTO tbl_investor (id_user, type, add, final)
    VALUES (?, 'Topup', ?, (SELECT IFNULL(SUM(final), 0) + ? FROM tbl_investor WHERE id_user = ?))
  `;
  connection.query(insertTopupSql, [userId, add, add, userId], (err, result) => {
    if (err) {
      console.error('Error inserting topup data to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Mengembalikan saldo terbaru setelah topup dari hasil query
      const saldo_ewallet = result.insertId ? add : 0;
      res.json({ saldo_ewallet });
    }
  });
};

exports.purchaseUmkm = function (req, res) {
  const { id_umkm, add } = req.body;
  const userId = req.auth.id_user;

  // Pastikan nilai add positif (karena ini adalah purchase)
  if (add <= 0) {
    return res.status(400).json({ error: 'Amount must be greater than 0 for purchase.' });
  }

  // Query untuk memasukkan data purchase ke dalam tabel
  const insertPurchaseSql = `
    INSERT INTO tbl_investor (id_user, id_umkm, type, add, final, update_time)
    VALUES (?, ?, 'Purchase', ?, (SELECT IFNULL(SUM(final), 0) - ? FROM nama_tabel WHERE id_user = ?), NOW())
  `;
  connection.query(insertPurchaseSql, [userId, id_umkm, add, add, userId], (err, result) => {
    if (err) {
      console.error('Error inserting purchase data to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Mengembalikan saldo terbaru setelah purchase dari hasil query
      const saldo_ewallet = result.insertId ? add : 0;

      // Update invest_amount di tbl_umkm
      const updateInvestAmountSql = `
        UPDATE tbl_umkm
        SET invest_amount = invest_amount + ?
        WHERE id_umkm = ?
      `;
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
