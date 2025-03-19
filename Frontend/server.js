const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'cs2410-web01pvm.aston.ac.uk',
    user: 'cs2team49',     
    password: 'wHP74YYCEr1LqhK',     
    database: 'cs2team49_db' 
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

app.get('/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    const sql = `
        SELECT product_id, name, price, image_url 
        FROM products 
        WHERE MATCH(name, description) AGAINST (? IN NATURAL LANGUAGE MODE)
    `;

    db.query(sql, [query], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        res.json(results);
    });
});
