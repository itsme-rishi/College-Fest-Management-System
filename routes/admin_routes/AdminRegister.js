// routes.js

const pool = require('../../db');


const express = require('express');
const router = express.Router();


// POST request to handle login
router.post('/', async (req, res) => {
  const { name, username, password, confirmPassword } = req.body;

  try {
    const insertQuery = 'INSERT INTO admin (name, username, password) VALUES ($1, $2, $3) RETURNING id';
    console.log('Insert Query:', insertQuery);

    const values = [name, username, password];
    await pool.query(insertQuery, values);
    
    console.log('Data inserted into PostgreSQL');
    res.json({ success: true });
  } catch (error) {
    console.error('Error inserting data into PostgreSQL: ', error);
    res.status(500).json({ error: 'Error inserting data into database' });
  }
});

module.exports = router;
