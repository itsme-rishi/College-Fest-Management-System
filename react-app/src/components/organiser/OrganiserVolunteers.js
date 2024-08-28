// const express = require('express');
// const router = express.Router();
// const pool = require('../database');

// // GET request to fetch events and their volunteers based on organiser ID
// router.get('/:organiserId', async (req, res) => {
//   const organiserId = req.params.organiserId;

//   try {
//     // Query to fetch events for which the current user is the organiser
//     const eventsQuery = `
//       SELECT e.id AS event_id, e.name AS event_name, e.date, e.time, e.type AS event_type, e.location,
//              v.id AS volunteer_id, s.name AS volunteer_name, v.approved
//       FROM event e
//       INNER JOIN org_event oe ON e.id = oe.eid
//       LEFT JOIN volunteer v ON e.id = v.event_id
//       LEFT JOIN student s ON v.student_id = s.id
//       WHERE oe.oid = $1
//     `;
//     const eventsResult = await pool.query(eventsQuery, [organiserId]);

//     // Organize events and their volunteers into a suitable data structure
//     const events = {};
//     eventsResult.rows.forEach(row => {
//       const eventId = row.event_id;
//       if (!events[eventId]) {
//         events[eventId] = {
//           id: eventId,
//           name: row.event_name,
//           date: row.date,
//           time: row.time,
//           type: row.event_type,
//           location: row.location,
//           volunteers: []
//         };
//       }
//       events[eventId].volunteers.push({
//         id: row.volunteer_id,
//         name: row.volunteer_name,
//         approved: row.approved
//       });
//     });

//     // Send the events data with volunteers as JSON response
//     res.json(Object.values(events));
//   } catch (error) {
//     console.error('Error fetching events and volunteers:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const pool = require('../../db');

// Remove volunteer
router.delete('/removeVolunteer/:volunteerId', async (req, res) => {
  const volunteerId = req.params.volunteerId;

  try {
    await pool.query('DELETE FROM volunteer WHERE id = $1', [volunteerId]);
    res.status(200).json({ message: 'Volunteer removed successfully' });
  } catch (error) {
    console.error('Error removing volunteer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Approve volunteer
router.put('/approveVolunteer/:volunteerId', async (req, res) => {
  const volunteerId = req.params.volunteerId;

  try {
    await pool.query('UPDATE volunteer SET approved = true WHERE id = $1', [volunteerId]);
    res.status(200).json({ message: 'Volunteer approved successfully' });
  } catch (error) {
    console.error('Error approving volunteer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Decline volunteer
router.put('/declineVolunteer/:volunteerId', async (req, res) => {
  const volunteerId = req.params.volunteerId;

  try {
    await pool.query('DELETE FROM volunteer WHERE id = $1', [volunteerId]);
    res.status(200).json({ message: 'Volunteer declined successfully' });
  } catch (error) {
    console.error('Error declining volunteer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET request to fetch events and their volunteers based on organiser ID
router.get('/:organiserId', async (req, res) => {
  const organiserId = req.params.organiserId;

//   console.log(`org id = ${organiserId} in fetching list`);

  try {
    // Query to fetch events for which the current user is the organiser
    const eventsQuery = `
      SELECT e.id AS event_id, e.name AS event_name, e.date, e.time, e.type AS event_type, e.location,
             v.id AS volunteer_id, s.name AS volunteer_name, v.approved
      FROM event e
      INNER JOIN org_event oe ON e.id = oe.eid
      LEFT JOIN volunteer v ON e.id = v.event_id
      LEFT JOIN student s ON v.student_id = s.id
      WHERE oe.oid = $1
    `;
    const eventsResult = await pool.query(eventsQuery, [organiserId]);

    // Organize events and their volunteers into a suitable data structure
    const events = {};
    eventsResult.rows.forEach(row => {
      const eventId = row.event_id;
      if (!events[eventId]) {
        events[eventId] = {
          id: eventId,
          name: row.event_name,
          date: row.date,
          time: row.time,
          type: row.event_type,
          location: row.location,
          volunteers: []
        };
      }
      events[eventId].volunteers.push({
        id: row.volunteer_id,
        name: row.volunteer_name,
        approved: row.approved
      });
    });

    // Send the events data with volunteers as JSON response
    res.json(Object.values(events));
  } catch (error) {
    console.error('Error fetching events and volunteers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
