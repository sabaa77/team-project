const express = require('express');
const mysql = require('mysql2');

const app = express();
const pool = mysql.createPool({
    host: 'localhost',
    user: 'cs2team49',
    password: 'wHP74YYCEr1LqhK',
    database: 'cs2team49_db'
});

app.use(express.json());

app.get('/search', (req, res) => {
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    const sql = 'SELECT * FROM products WHERE name LIKE ? OR description LIKE ?';
    const searchValue = `%${query}%`;

    pool.query(sql, [searchValue, searchValue], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }

        res.json(results);
    });
});

app.listen(3000, () => console.log('Server is running on port 3000'));
