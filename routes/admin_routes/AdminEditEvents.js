const pool = require('../../db');

const express = require('express');
const router = express.Router();

router.get('/events', async (req, res) => {
  try {
    // Query to retrieve events from the "events" table
    const query = 'SELECT * FROM event';
    const result = await pool.query(query);

    // Send the retrieved events as the response
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET request to fetch event details by ID
router.get('/events/:id', async (req, res) => {
  const eventId = req.params.id;

  try {
    // Query to retrieve event details by ID from the "events" table
    const query = 'SELECT * FROM event WHERE id = $1';
    const result = await pool.query(query, [eventId]);

    // Check if the event with the specified ID exists
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Send the retrieved event as the response
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT request to update event details
router.put('/modifyEvents/:id', async (req, res) => {
  const eventId = req.params.id;
  const { name, date, time, type, location } = req.body;

  try {
    // Query to update event details in the "events" table
    const query = `
      UPDATE event 
      SET name = $1, date = $2, time = $3, type = $4, location = $5
      WHERE id = $6
    `;
    await pool.query(query, [name, date, time, type, location, eventId]);

    // Respond with success message
    res.status(200).json({ message: 'Event modified successfully' });
  } catch (error) {
    console.error('Error modifying event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/addEvent', async (req, res) => {
  const { name, date, time, type, location } = req.body;

  console.log(`name = ${name} and date = ${date}`)

  try {
    // Here you can perform validation on the received data if necessary

    console.log('before db adding');

    // Inserting the event into the database
    const query = 'INSERT INTO event (name, date, time, type, location) VALUES ($1, $2, $3, $4, $5)';
    const newEvent = await pool.query(
      query, [name, date, time, type, location]
    );

    console.log('after db adding');

    res.status(201).json({ message: 'Added Successfully', event: newEvent.rows[0] }); // Respond with success message and inserted event data
  } catch (error) {
    console.error('Error handling adding event:', error);
    res.status(500).json({ error: 'Failed to add event' }); // Respond with error message
  }
});

 
// Route handler to handle requests to delete an event
router.delete('/deleteEvent/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Query to delete the event with the specified ID from the "events" table
    const query = 'DELETE FROM event WHERE id = $1';
    await pool.query(query, [id]);

    res.json({ message: `Event with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;