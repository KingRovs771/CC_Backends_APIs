const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi() {
  // return function (req, rest, next) {
  //   // Cek authorizzation header
  //   var tokenWithBearer = req.headers.authorization;
  //   if (tokenWithBearer) {
  //     var token = tokenWithBearer.split(' ')[1];
  //     // Verifikasi
  //     jwt.verify(token, config.secret, function (err, decoded) {
  //       if (err) {
  //         return rest.status(401).send({ auth: false, message: 'Token tidak terdaftar!' });
  //       } else {
  //         // Menyimpan informasi pengguna yang terverifikasi di objek req.auth
  //         req.auth = decoded;
  //         next();
  //       }
  //     });
  //   } else {
  //     return rest.status(401).send({ auth: false, message: 'Token tidak tersedia!' });
  //   }
  // };
}
module.exports = verifikasi;
