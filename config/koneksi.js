const mysql = require('mysql');

// Konfigurasi koneksi MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ganti dengan username MySQL Anda
  password: 'LikaRovs771@', // Ganti dengan password MySQL Anda
  database: 'api_growumkm', // Ganti dengan nama database Anda
});

// Terhubung ke database
db.connect((err) => {
  if (err) {
    console.error('Koneksi ke database gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke database dengan ID ' + db.threadId);
});
module.exports = db;
