const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Mengimpor koneksi database dan routes pasien
const db = require('./config/db'); // Sesuaikan path dengan file db.js Anda
const pasienRoutes = require('./routes/pasien'); // Routes untuk pasien

const doctorRoutes = require('./routes/dokter');

require('dotenv').config(); // Menggunakan dotenv untuk variabel lingkungan
const port = process.env.PORT || 3000; // Gunakan PORT dari .env atau 3000 sebagai default

const expressLayouts = require('express-ejs-layouts');
app.use(expressLayouts);  // Mengaktifkan express-ejs-layouts
app.set('layout', 'layouts/layout');


// Set view engine ke EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Lokasi views

// Middleware untuk parse request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Menggunakan static files (misalnya CSS, JS) di folder public
app.use(express.static(path.join(__dirname, 'public')));

// Gunakan routes untuk halaman pasien
app.use('/pasien', pasienRoutes);

// Halaman utama (home) yang mengarahkan ke /pasien
app.get('/', (req, res) => {
    res.render('index', { 
        layout: 'layouts/layout', // Correct relative path to the layout
    });        
});

// Halaman untuk melihat daftar pasien
app.get('/pasien', (req, res) => {
    // Query database untuk mendapatkan daftar pasien
    db.query('SELECT * FROM pasien', (err, results) => {
        if (err) {
            console.error(err); // Log error di console untuk debugging
            return res.status(500).send('Internal Server Error'); // Kirim response error ke client
        }
        // Merender halaman dengan data pasien dan menggunakan layout
        res.render('pasien/datapasien', { 
            layout: 'layouts/layout', // Correct relative path to the layout
            pasien: results           // Data passed to the view
        });        
    });
});

// Routes
app.use('/doctors', doctorRoutes);

// 404 handler untuk halaman yang tidak ditemukan
app.use((req, res) => {
    res.status(404).send('404 - Halaman Tidak Ditemukan');
});

// Mulai server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
