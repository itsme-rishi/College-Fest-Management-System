// const pool = require('../database');

// const express = require('express');
// const router = express.Router();

// router.get('/externalparticipants', async (req, res) => {
//   try {
//     // Query to retrieve external participants from the "externalparticipant" table
//     const query = 'SELECT * FROM externalparticipant';
//     const result = await pool.query(query);

//     // Send the retrieved external participants as the response
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching external participants:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // GET request to fetch external participant details by ID
// router.get('/externalparticipants/:id', async (req, res) => {
//   const participantId = req.params.id;

//   try {
//     // Query to retrieve external participant details by ID from the "externalparticipant" table
//     const query = 'SELECT * FROM externalparticipant WHERE id = $1';
//     const result = await pool.query(query, [participantId]);

//     // Check if the external participant with the specified ID exists
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'External participant not found' });
//     }

//     // Send the retrieved external participant as the response
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error fetching external participant details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // PUT request to update external participant details
// router.put('/modifyExternalParticipants/:id', async (req, res) => {
//   const participantId = req.params.id;
//   const { name, college_name, gender, gmail, password, food, hall } = req.body;

//   try {
//     // Query to update external participant details in the "externalparticipant" table
//     const query = `
//       UPDATE externalparticipant 
//       SET name = $1, college_name = $2, gender = $3, gmail = $4, password = $5, food = $6, hall = $7
//       WHERE id = $8
//     `;
//     await pool.query(query, [name, college_name, gender, gmail, password, food, hall, participantId]);

//     // Respond with success message
//     res.status(200).json({ message: 'External participant modified successfully' });
//   } catch (error) {
//     console.error('Error modifying external participant:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.post('/addExternalParticipant', async (req, res) => {
//   const { name, college_name, gender, gmail, password, food, hall } = req.body;
 
//   try {
//     // Inserting the external participant into the database
//     const query = 'INSERT INTO externalparticipant (name, college_name, gender, gmail, password, food, hall) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
//     const newExternalParticipant = await pool.query(query, [name, college_name, gender, gmail, password, food, hall]);

//     res.status(201).json({ message: 'External Participant added successfully', externalParticipant: newExternalParticipant.rows[0] }); // Respond with success message and inserted external participant data
//   } catch (error) {
//     console.error('Error adding external participant:', error);
//     res.status(500).json({ error: 'Failed to add external participant' }); // Respond with error message
//   }
// });

// // Route handler to handle requests to delete an external participant
// router.delete('/deleteExternalParticipant/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Query to delete the external participant with the specified ID from the "externalparticipant" table
//     const query = 'DELETE FROM externalparticipant WHERE id = $1';
//     await pool.query(query, [id]);

//     res.json({ message: `External participant with ID ${id} deleted successfully` });
//   } catch (error) {
//     console.error('Error deleting external participant:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;


const pool = require('../../db');

const express = require('express');
const router = express.Router();

router.get('/externalparticipants', async (req, res) => {
  try {
    const query = 'SELECT * FROM externalparticipant';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching external participants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/externalparticipants/:id', async (req, res) => {
  const participantId = req.params.id;

  try {
    const query = 'SELECT * FROM externalparticipant WHERE id = $1';
    const result = await pool.query(query, [participantId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'External participant not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching external participant details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/approveExternalParticipant/:id', async (req, res) => {
  const participantId = req.params.id;

  console.log(`in backend with ${participantId}`);

  try {
    const query = 'UPDATE externalparticipant SET approved = true WHERE id = $1';
    await pool.query(query, [participantId]);

    res.status(200).json({ message: 'External participant approved successfully' });
  } catch (error) {
    console.error('Error approving external participant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/modifyExternalParticipant/:id', async (req, res) => {
  const participantId = req.params.id;
  const { name, college_name, gender, gmail, password, food, hall, approved } = req.body;

  try {
    const query = `
      UPDATE externalparticipant 
      SET name = $1, college_name = $2, gender = $3, gmail = $4, password = $5, food = $6, hall = $7, approved = $8
      WHERE id = $9
    `;
    await pool.query(query, [name, college_name, gender, gmail, password, food, hall, approved, participantId]);

    res.status(200).json({ message: 'External participant modified successfully' });
  } catch (error) {
    console.error('Error modifying external participant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/addExternalParticipant', async (req, res) => {
  const { name, college_name, gender, gmail, password, food, hall } = req.body;
 
  try {
    const query = 'INSERT INTO externalparticipant (name, college_name, gender, gmail, password, food, hall) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
    const newExternalParticipant = await pool.query(query, [name, college_name, gender, gmail, password, food, hall]);

    res.status(201).json({ message: 'External Participant added successfully', externalParticipant: newExternalParticipant.rows[0] });
  } catch (error) {
    console.error('Error adding external participant:', error);
    res.status(500).json({ error: 'Failed to add external participant' });
  }
});

router.delete('/deleteExternalParticipant/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM externalparticipant WHERE id = $1';
    await pool.query(query, [id]);

    res.json({ message: `External participant with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting external participant:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
