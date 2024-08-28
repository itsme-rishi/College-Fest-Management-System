// const pool = require('../database');

// const express = require('express');
// const router = express.Router();

// router.get('/students', async (req, res) => {
//   try {
//     // Query to retrieve students from the "student" table
//     const query = 'SELECT * FROM student';
//     const result = await pool.query(query);

//     // Send the retrieved students as the response
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // GET request to fetch student details by ID
// router.get('/students/:id', async (req, res) => {
//   const studentId = req.params.id;

//   try {
//     // Query to retrieve student details by ID from the "student" table
//     const query = 'SELECT * FROM student WHERE id = $1';
//     const result = await pool.query(query, [studentId]);

//     // Check if the student with the specified ID exists
//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // Send the retrieved student as the response
//     res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error fetching student details:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // PUT request to update student details
// router.put('/modifyStudents/:id', async (req, res) => {
//   const studentId = req.params.id;
//   const { roll, name, department, gender, password, institute_email } = req.body;

//   try {
//     // Query to update student details in the "student" table
//     const query = `
//       UPDATE student 
//       SET roll = $1, name = $2, department = $3, gender = $4, password = $5, institute_email = $6
//       WHERE id = $7
//     `;
//     await pool.query(query, [roll, name, department, gender, password, institute_email, studentId]);

//     // Respond with success message
//     res.status(200).json({ message: 'Student modified successfully' });
//   } catch (error) {
//     console.error('Error modifying student:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// router.post('/addStudent', async (req, res) => {
//   const { roll, name, department, gender, password, institute_email } = req.body;

//   try {
//     // Inserting the student into the database
//     const query = 'INSERT INTO student (roll, name, department, gender, password, institute_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
//     const newStudent = await pool.query(query, [roll, name, department, gender, password, institute_email]);

//     res.status(201).json({ message: 'Student added successfully', student: newStudent.rows[0] }); // Respond with success message and inserted student data
//   } catch (error) {
//     console.error('Error adding student:', error);
//     res.status(500).json({ error: 'Failed to add student' }); // Respond with error message
//   }
// });

// // Route handler to handle requests to delete a student
// router.delete('/deleteStudent/:id', async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Query to delete the student with the specified ID from the "student" table
//     const query = 'DELETE FROM student WHERE id = $1';
//     await pool.query(query, [id]);

//     res.json({ message: `Student with ID ${id} deleted successfully` });
//   } catch (error) {
//     console.error('Error deleting student:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// module.exports = router;

const pool = require('../../db');
const express = require('express');
const router = express.Router();

// GET request to fetch all students
router.get('/students', async (req, res) => {
  try {
    const query = 'SELECT * FROM student';
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET request to fetch student details by ID
router.get('/students/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const query = 'SELECT * FROM student WHERE id = $1';
    const result = await pool.query(query, [studentId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching student details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT request to update student details
router.put('/modifyStudents/:id', async (req, res) => {
  const studentId = req.params.id;
  const { roll, name, department, gender, password, institute_email } = req.body;

  try {
    const query = `
      UPDATE student 
      SET roll = $1, name = $2, department = $3, gender = $4, password = $5, institute_email = $6
      WHERE id = $7
    `;
    await pool.query(query, [roll, name, department, gender, password, institute_email, studentId]);

    // Respond with success message and updated student details
    const updatedStudent = await pool.query('SELECT * FROM student WHERE id = $1', [studentId]);
    res.status(200).json({ message: 'Student modified successfully', student: updatedStudent.rows[0] });
  } catch (error) {
    console.error('Error modifying student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST request to add a new student
router.post('/addStudent', async (req, res) => {
  const { roll, name, department, gender, password, institute_email } = req.body;

  try {
    const query = 'INSERT INTO student (roll, name, department, gender, password, institute_email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const newStudent = await pool.query(query, [roll, name, department, gender, password, institute_email]);

    res.status(201).json({ message: 'Student added successfully', student: newStudent.rows[0] });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ error: 'Failed to add student' });
  }
});

// DELETE request to delete a student by ID
router.delete('/deleteStudent/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const query = 'DELETE FROM student WHERE id = $1';
    await pool.query(query, [id]);

    res.json({ message: `Student with ID ${id} deleted successfully` });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT request to approve a student by ID
router.put('/approveStudent/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const query = 'UPDATE student SET approved = true WHERE id = $1';
    await pool.query(query, [studentId]);

    // Respond with success message
    res.status(200).json({ message: 'Student approved successfully' });
  } catch (error) {
    console.error('Error approving student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE request to decline (delete) an unapproved student by ID
router.delete('/declineStudent/:id', async (req, res) => {
  const studentId = req.params.id;

  try {
    const query = 'DELETE FROM student WHERE id = $1 AND approved = false';
    const result = await pool.query(query, [studentId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Student not found or already approved' });
    }

    res.status(200).json({ message: 'Student declined (deleted) successfully' });
  } catch (error) {
    console.error('Error declining student:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
