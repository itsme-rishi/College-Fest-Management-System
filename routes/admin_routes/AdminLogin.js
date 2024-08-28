const pool = require('../../db');

const express = require('express');
const router = express.Router();

// POST request to handle login
router.post('/', async (req, res) => {
  const { username, password } = req.body;

  console.log(`username = ${username} and password = ${password}`);

  try {
    // Check if the username and password match in the admin table
    const query = 'SELECT * FROM admin WHERE username = $1 AND password = $2';
    const result = await pool.query(query, [username, password]);

    if (result.rows.length === 1) {
      // Username and password match, send match message to frontend
      res.json({ message: 'Match' });
    } else {
      // Username and password do not match, send non-match message to frontend
      res.json({ message: 'No match' });
    }
  } catch (error) {
    console.error('Error checking credentials:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;