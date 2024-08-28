const pool = require('../../db');

const express = require('express');
const router = express.Router();

router.get('/org_event/:organiserId', (req, res) => {
    const organiserId = req.params.organiserId;
    console.log(`org id in backend = ${organiserId}`);
    const sql = `
      SELECT event.id, event.name, event.date, event.time, event.type, event.location
      FROM event
      INNER JOIN org_event ON event.id = org_event.eid
      WHERE org_event.oid = $1 AND org_event.approved = true
    `;
    // Use the pool to execute the query
    pool.query(sql, [organiserId], (err, result) => {
      if (err) {
        console.error('Error fetching events:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      res.json(result.rows);
    });
  });

  module.exports = router;