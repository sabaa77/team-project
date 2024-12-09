const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');

const app = express();
const pool = mysql.createPool({
    host: 'cs2410-web01pvm.aston.ac.uk',
    user: 'cs2team49',
    password: 'wHP74YYCEr1LqhK',
    database: 'cs2team49_db'
});

const upload = multer({
    storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
    })
});

app.post('/upload', upload.single('file'), (req, res) => {
    const fileName = req.file.originalname;
    const filePath = req.file.path;

    pool.query(
        'INSERT INTO files (name, file_path) VALUES (?, ?)',
        [fileName, filePath],
        (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error saving file.');
            } else {
                res.status(201).send('File uploaded successfully!');
            }
        }
    );
});

app.listen(3000, () => console.log('Server running on port 3000'));
