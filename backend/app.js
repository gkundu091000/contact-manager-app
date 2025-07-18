const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// MySQL connection via environment variables for Docker
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "yourpassword",
  database: process.env.DB_NAME || "contact_db"
});

// Get all contacts
app.get('/api/contacts', (req, res) => {
  db.query('SELECT * FROM contacts', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Add a new contact
app.post('/api/contacts', (req, res) => {
  const { name, email, phone } = req.body;
  db.query(
    'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)',
    [name, email, phone],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, name, email, phone });
    }
  );
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

