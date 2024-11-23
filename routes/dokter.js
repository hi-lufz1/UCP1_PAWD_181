const express = require('express');
const router = express.Router();

// Dummy data untuk dokter
let doctors = [
    { id: 1, name: 'Dr. John Doe', specialization: 'Cardiologist', active: true },
    { id: 2, name: 'Dr. Jane Smith', specialization: 'Neurologist', active: false }
];

// GET /doctors - Menampilkan daftar dokter
router.get('/', (req, res) => {
    res.render('dokter/datadokter', { doctors }); // Kirim data dokter ke tampilan
});

// POST /doctors - Menambahkan dokter baru
router.post('/', (req, res) => {
    const newDoctor = {
        id: doctors.length + 1,
        name: req.body.name,
        specialization: req.body.specialization,
        active: req.body.active || false
    };
    doctors.push(newDoctor);
    res.status(201).json(newDoctor);
});

// Rute untuk halaman edit dokter
router.get('/edit/:id', (req, res) => {
    const doctorId = parseInt(req.params.id);  // Mengambil ID dari parameter
    const doctor = doctors.find(d => d.id === doctorId);  // Mencari dokter berdasarkan ID

    if (doctor) {
        res.render('dokter/edit', { doctor });  // Menampilkan formulir edit dokter
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
});

// PUT /doctors/:id - Memperbarui data dokter berdasarkan ID
router.post('/:id', (req, res) => {
    const doctorId = parseInt(req.params.id);
    const { name, specialization, active } = req.body;

    const doctor = doctors.find(d => d.id === doctorId);  // Mencari dokter berdasarkan ID

    if (doctor) {
        // Memperbarui data dokter
        if (name !== undefined) doctor.name = name;
        if (specialization !== undefined) doctor.specialization = specialization;
        if (active !== undefined) doctor.active = active;

        res.redirect('/doctors');  // Redirect kembali ke halaman daftar dokter
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
});



// DELETE /doctors/:id - Menghapus dokter berdasarkan ID
router.get('/delete/:id', (req, res) => {
    const doctorId = parseInt(req.params.id);  // Mengambil ID dari parameter
    const index = doctors.findIndex(d => d.id === doctorId);  // Mencari dokter berdasarkan ID

    if (index !== -1) {
        const deletedDoctor = doctors.splice(index, 1);  // Menghapus dokter
        res.redirect('/doctors');  // Redirect ke halaman daftar dokter setelah menghapus
    } else {
        res.status(404).json({ message: 'Doctor not found' });
    }
});
// Rute untuk menampilkan halaman tambah dokter
router.get('/add', (req, res) => {
    res.render('dokter/add');  // Menampilkan formulir tambah dokter
});


module.exports = router;
