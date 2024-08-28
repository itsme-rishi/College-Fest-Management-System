const pool = require('../../db');

const express = require('express');
const router = express.Router();

// ********************************************************
router.post('/addOrganiser', async (req, res) => {
  const { name, username, password, pastExperience } = req.body;

  try {
    // Inserting the organiser into the database
    const query = 'INSERT INTO organiser (name, username, password, pastExperience) VALUES ($1, $2, $3, $4) RETURNING *';
    const newOrganiser = await pool.query(query, [name, username, password, pastExperience]);

    res.status(201).json({ message: 'Organiser added successfully', organiser: newOrganiser.rows[0] }); // Respond with success message and inserted organiser data
  } catch (error) {
    console.error('Error adding organiser:', error);
    res.status(500).json({ error: 'Failed to add organiser' }); // Respond with error message
  }
});
// ********************************************************

router.get('/organisers', async (req, res) => {
  try {
    // Query to retrieve organisers from the "organiser" table
    // const query = 'SELECT * FROM organiser';
    // const query = `
    //       SELECT o.id AS id, o.name AS name, o.pastexperience, e.id AS event_id, e.name AS event_name
    //       FROM organiser o
    //       LEFT JOIN org_event oe ON o.id = oe.oid
    //       LEFT JOIN event e ON oe.eid = e.id
    //   `;
    // const result = await pool.query(query);

    // // Send the retrieved organisers as the response
    // res.json(result.rows);

    const query = `
    SELECT o.id AS organiser_id, o.name AS organiser_name, o.pastexperience, o.approved,
           e.id AS event_id, e.name AS event_name
    FROM organiser o
    LEFT JOIN org_event oe ON o.id = oe.oid
    LEFT JOIN event e ON oe.eid = e.id
`;

const result = await pool.query(query);

// Structure the response to include events for each organiser
const organisersWithEvents = {};

result.rows.forEach(row => {
    const { organiser_id, organiser_name, pastexperience, event_id, event_name, approved } = row;
    
    // If organiser not yet added to organisersWithEvents, add it
    if (!organisersWithEvents[organiser_id]) {
        organisersWithEvents[organiser_id] = {
            id: organiser_id,
            name: organiser_name,
            pastexperience: pastexperience,
            approved : approved,
            events: []
        };
    }

    // Add event to organiser's events array
    organisersWithEvents[organiser_id].events.push({
        id: event_id,
        name: event_name
    });
});

    console.log(organisersWithEvents);

    // Convert object values to array and send as response
    res.json(Object.values(organisersWithEvents));

  } catch (error) {
    console.error('Error fetching organisers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/approveOrganiser/:id', async (req, res) => {
  const organiserId = req.params.id;

  try {
    // Query to update the approval status of the organiser in the database
    const query = 'UPDATE organiser SET approved = true WHERE id = $1';
    await pool.query(query, [organiserId]);

    res.status(200).json({ message: 'Organiser approved successfully' });
  } catch (error) {
    console.error('Error approving organiser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/deleteOrganiser/:id', async (req, res) => {
  const organiserId = req.params.id;

  try {
    // Query to delete the organiser with the specified ID from the "organiser" table
    const query = 'DELETE FROM organiser WHERE id = $1';
    await pool.query(query, [organiserId]);

    res.status(200).json({ message: `Organiser with ID ${organiserId} deleted successfully` });
  } catch (error) {
    console.error('Error deleting organiser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Backend code - API endpoint to fetch organisers with events
// router.get('/organisers-with-events', async (req, res) => {
//   try {
//       const query = `
//           SELECT o.id AS organiser_id, o.name AS organiser_name, o.pastexperience, e.id AS event_id, e.name AS event_name
//           FROM organiser o
//           LEFT JOIN org_event oe ON o.id = oe.oid
//           LEFT JOIN event e ON oe.eid = e.id
//       `;
//       const result = await pool.query(query);
//       res.json(result.rows);
//   } catch (error) {
//       console.error('Error fetching organisers with events:', error);
//       res.status(500).json({ error: 'Internal server error' });
//   }
// });


module.exports = router;
