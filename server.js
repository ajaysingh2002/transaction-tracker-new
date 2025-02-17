const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ajay@5560',
    database: 'transaction_tracker'
});

db.connect((err) => {
    if (err) throw err;
    console.log('MySQL Connected...');
});

// Add Transaction
app.post('/api/transactions', (req, res) => {
    const { amount, date, description, category } = req.body;
    const sql = 'INSERT INTO transactions (amount, date, description, category) VALUES (?, ?, ?, ?)';
    db.query(sql, [amount, date, description, category], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Edit Transaction
app.put('/api/transactions/:id', (req, res) => {
    const { amount, date, description, category } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE transactions SET amount = ?, date = ?, description = ?, category = ? WHERE id = ?';
    db.query(sql, [amount, date, description, category, id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Delete Transaction
app.delete('/api/transactions/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM transactions WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Get Transactions
app.get('/api/transactions', (req, res) => {
    const sql = 'SELECT * FROM transactions';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
