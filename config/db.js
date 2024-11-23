const mysql = require('mysql2');

// Membuat koneksi ke database MySQL
const db = mysql.createConnection({
    host: 'localhost',    // Ganti dengan host database Anda
    user: 'root',         // Ganti dengan username database Anda
    password: '',         // Ganti dengan password database Anda
    database: 'ucppawrs'  // Ganti dengan nama database Anda
});

db.connect((err) => {
    if (err) {
        console.error('Koneksi ke database gagal:', err.stack);
        return;
    }
    console.log('Terhubung ke database MySQL dengan ID:', db.threadId);
});

module.exports = db; // Menyediakan koneksi database untuk digunakan di file lain
