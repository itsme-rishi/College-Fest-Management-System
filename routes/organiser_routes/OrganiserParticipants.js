const express = require('express');
const router = express.Router();
const pool = require('../../db');

// GET request to fetch events and their participants based on organiser ID
router.get('/:organiserId', async (req, res) => {
  const organiserId = req.params.organiserId;

  try {
    // Query to fetch events and their participants using type column to differentiate between students and external participants
    const eventsQuery = `
      SELECT e.id AS event_id, e.name AS event_name, e.date, e.time, e.type AS event_type, e.location,
             CASE
                 WHEN p.type = true THEN s.name
                 ELSE ep.name
             END AS participant_name,
             CASE
                 WHEN p.type = true THEN 'Student'
                 ELSE 'External Participant'
             END AS participant_type,
             CASE
                 WHEN p.type = true THEN s.institute_email
                 ELSE ep.gmail
             END AS email,
             CASE
                 WHEN p.type = true THEN 'IIT Kharagpur'  -- College name for students
                 ELSE ep.college_name  -- College name for external participants
             END AS college_name
      FROM event e
      INNER JOIN org_event oe ON e.id = oe.eid
      LEFT JOIN participant p ON e.id = p.eid
      LEFT JOIN student s ON p.sid = s.id AND p.type = true
      LEFT JOIN externalparticipant ep ON p.sid = ep.id AND p.type = false
      WHERE oe.oid = $1 AND oe.approved = true
    `;
    const eventsResult = await pool.query(eventsQuery, [organiserId]);

    // Organize events and their participants into a suitable data structure
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
          participants: []
        };
      }
      events[eventId].participants.push({
        name: row.participant_name,
        type: row.participant_type,
        email: row.email,
        collegeName: row.college_name
      });
    });

    res.json(Object.values(events));
  } catch (error) {
    console.error('Error fetching events and participants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
