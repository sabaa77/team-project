const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();
const PORT = 3000;

const pool = new Pool({
    user: 'your_db_user',
    host: 'localhost',
    database: 'your_db_name',
    password: 'your_db_password',
    port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Sign-up Route
app.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', [email, hashedPassword, name]);
        res.status(201).send('Signup successful');
    } catch (err) {
        if (err.code === '23505') {
            res.status(400).send('Email already exists');
        } else {
            console.error(err);
            res.status(500).send('Server error');
        }
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, email: user.email, name: user.name };
            res.status(200).send('Login successful');
        } else {
            res.status(400).send('Invalid email or password');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).send('Logout successful');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
