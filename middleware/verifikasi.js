const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(req, res, next) {
  // Cek authorization header
  var tokenWithBearer = req.headers.authorization;

  if (tokenWithBearer) {
    var token = tokenWithBearer.split(' ')[1];

    // Verifikasi token
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.status(401).send({ auth: false, message: 'Token tidak terdaftar!' });
      } else {
        // Jika verifikasi berhasil, tambahkan decoded ke req.auth
        req.auth = decoded;
        next();
      }
    });
  } else {
    return res.status(401).send({ auth: false, message: 'Token tidak tersedia!' });
  }
}
module.exports = verifikasi;
