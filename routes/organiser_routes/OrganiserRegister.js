// const pool = require('../database');

// const express = require('express');
// const router = express.Router();

// // code
// app.post('/', async (req, res) => {
//     const { name, username, password, pastExperience, selectedEvents } = req.body;
  
//     try {
//       // Start a client transaction
//     //   const client = await pool.connect();
//     //   await client.query('BEGIN');
  
//       // Insert into organiser table
//       const organiserInsertQuery = `
//         INSERT INTO organiser (name, username, password, past_experience, approved)
//         VALUES ($1, $2, $3, $4, $5)
//         RETURNING id`;
//       const organiserInsertValues = [name, username, password, pastExperience, false];
//       const organiserResult = await client.query(organiserInsertQuery, organiserInsertValues);
//       const organiserId = organiserResult.rows[0].id;
  
//       // Insert into org_event table for each selected event
//       for (const eventId of selectedEvents) {
//         const orgEventInsertQuery = `
//           INSERT INTO org_event (oid, eid)
//           VALUES ($1, $2)`;
//         const orgEventInsertValues = [organiserId, eventId];
//         await client.query(orgEventInsertQuery, orgEventInsertValues);
//       }
  
//       // Commit the transaction
//     //   await client.query('COMMIT');
//     //   client.release();
  
//       res.status(201).json({ message: 'Organiser registration successful' });
//     } catch (error) {
//       // Rollback the transaction if any error occurs
//     //   await client.query('ROLLBACK');
//     //   client.release();
  
//       console.error('Error during organiser registration:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// module.exports = router;

const pool = require('../../db');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, username, password, pastExperience, selectedEvents } = req.body;

    try {
        // Insert into organiser table
        const organiserInsertQuery = `
            INSERT INTO organiser (name, username, password, pastExperience, approved)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id`;
        const organiserInsertValues = [name, username, password, pastExperience, false];
        const organiserResult = await pool.query(organiserInsertQuery, organiserInsertValues);
        const organiserId = organiserResult.rows[0].id;

        // Insert into org_event table for each selected event
        for (const eventId of selectedEvents) {
            const orgEventInsertQuery = `
                INSERT INTO org_event (oid, eid)
                VALUES ($1, $2)`;
            const orgEventInsertValues = [organiserId, eventId];
            await pool.query(orgEventInsertQuery, orgEventInsertValues);
        }

        res.status(201).json({ message: 'Organiser registration successful' });
    } catch (error) {
        console.error('Error during organiser registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
