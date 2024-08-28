const pool = require('../../db');

const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log(`username = ${username} and password = ${password}`);

    try {
      // Check if the username and password match
      const query = 'SELECT * FROM organiser WHERE username = $1 AND password = $2';
      const values = [username, password];
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        return res.status(200).json({ message: 'Username or password is incorrect' });
      }
  
      const organiser = result.rows[0];
  
      // Check if the organiser is approved
      if (!organiser.approved) {
        console.log('account not approved yet');
        return res.status(200).json({ message: 'Your account is not approved yet' });
      }
  
      // If username, password, and approved status are correct, send success message
      console.log('account approved');
      return res.status(200).json({ message: 'Match', organiserId: organiser.id });
    } catch (error) {
      console.error('Error during organiser login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;