const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const session = require('express-session');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'yourUsername',
    host: 'localhost',
    database: 'yourDatabase',
    password: 'yourPassword',
    port: 5432
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: true
}));

app.use(express.static('public'));

app.post('/signup', async (req, res) => {
    const { email, password, name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).send('User already exists.');
        }

        await pool.query('INSERT INTO users (email, password, name) VALUES ($1, $2, $3)', [email, hashedPassword, name]);
        res.status(201).send('Signup successful');
    } catch (err) {
        res.status(500).send('Signup error: ' + err.message);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (user && await bcrypt.compare(password, user.password)) {
            req.session.user = { id: user.id, email: user.email };
            res.status(200).send('Login successful');
        } else {
            res.status(400).send('Invalid email or password');
        }
    } catch (err) {
        res.status(500).send('Login error: ' + err.message);
    }
});

app.post('/saveBasket', async (req, res) => {
    const { email, basket } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        const user = userResult.rows[0];

        if (user) {
            const basketData = JSON.stringify(basket);

            await pool.query('INSERT INTO baskets (user_id, basket_data) VALUES ($1, $2)', [user.id, basketData]);

            res.status(200).send('Basket saved successfully!');
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send('Basket saving error: ' + err.message);
    }
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
