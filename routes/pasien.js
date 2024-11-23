const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Pastikan Anda sudah membuat file untuk koneksi database

// READ: Menampilkan semua pasien
router.get('/', (req, res) => {
    db.query('SELECT * FROM pasien', (err, results) => {
        if (err) throw err;
        res.render('pasien/datapasien', { pasien: results }); // Render halaman dengan data pasien
    });
});

// CREATE: Menampilkan form tambah pasien
router.get('/add', (req, res) => {
    res.render('pasien/add'); // Render halaman form tambah pasien
});

// CREATE: Menambahkan data pasien
router.post('/add', (req, res) => {
    const { nama, usia, gender, alamat, diagnosa } = req.body;
    const sql = 'INSERT INTO pasien (nama, usia, gender, alamat, diagnosa) VALUES (?, ?, ?, ?, ?)';
    db.query(sql, [nama, usia, gender, alamat, diagnosa], (err, results) => {
        if (err) throw err;
        res.redirect('/pasien'); // Setelah menambah, kembali ke halaman daftar pasien
    });
});

// UPDATE: Menampilkan form edit pasien
router.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM pasien WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.render('pasien/edit', { pasien: results[0] }); // Render halaman edit dengan data pasien yang diambil
    });
});

// UPDATE: Mengedit data pasien
router.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { nama, usia, gender, alamat, diagnosa } = req.body;
    const sql = 'UPDATE pasien SET nama = ?, usia = ?, gender = ?, alamat = ?, diagnosa = ? WHERE id = ?';
    db.query(sql, [nama, usia, gender, alamat, diagnosa, id], (err, results) => {
        if (err) throw err;
        res.redirect('/pasien'); // Setelah mengedit, kembali ke halaman daftar pasien
    });
});

// DELETE: Menghapus data pasien
router.get('/delete/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM pasien WHERE id = ?', [id], (err, results) => {
        if (err) throw err;
        res.redirect('/pasien'); // Setelah menghapus, kembali ke halaman daftar pasien
    });
});

module.exports = router;
