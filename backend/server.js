// Express Server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'farmco',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.get('/getLogin', (req, res) => {
  const q = 'SELECT * FROM `admin`';
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// API endpoint for user login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = 'SELECT * FROM `admin` WHERE `admin_un` = ? AND `admin_pw` = ?';

  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

app.listen(5000, '0.0.0.0', () => {
  console.log('Server is running on port 5000');
});