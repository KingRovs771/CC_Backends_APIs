'use strict';

const response = require('../res');
const connection = require('../config/koneksi');

exports.AllUmkm = function (req, res) {
  connection.query(
    'SELECT tbl_umkm.id_umkm, tbl_umkm.nama_umkm, tbl_umkm.trgt_invest, tbl_umkm.invest_amount, tbl_umkm.tgl_berakhir, tbl_umkm.img, tbl_users.id_user, tbl_provinsi.id_provinsi, tbl_sektor.id_sektor FROM tbl_umkm INNER JOIN tbl_users ON tbl_umkm.id_user =  tbl_users.id_user INNER JOIN tbl_provinsi ON tbl_umkm.id_provinsi=tbl_provinsi.id_provinsi INNER JOIN tbl_sektor ON tbl_umkm.id_sektor = tbl_sektor.id_sektor',
    function (error, rows, fields) {
      if (error) {
        connection.log(error);
      } else {
        response.success(rows, res);
      }
    }
  );
};

exports.getUmkmById = function (req, res) {
  let id_umkm = req.params.id;
  connection.query(
    'SELECT tbl_umkm.id_umkm, tbl_umkm.nama_umkm, tbl_umkm.trgt_invest, tbl_umkm.invest_amount, tbl_umkm.tgl_berakhir, tbl_umkm.img, tbl_users.id_user, tbl_provinsi.id_provinsi, tbl_sektor.id_sektor FROM tbl_umkm INNER JOIN tbl_users ON tbl_umkm.id_user =  tbl_users.id_user INNER JOIN tbl_provinsi ON tbl_umkm.id_provinsi=tbl_provinsi.id_provinsi INNER JOIN tbl_sektor ON tbl_umkm.id_sektor = tbl_sektor.id_sektor WHERE id_umkm = ?',
    [id_umkm],
    function (error, rows, fields) {
      if (error) {
        connection.log(error);
      } else {
        response.success(rows, res);
      }
    }
  );
};
