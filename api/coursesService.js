import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

router.post('/courses', async (req, res) => {
    const { course_id, course_name, credits, department_id, faculty_id } = req.body;
  
    if (!course_id || !course_name || !credits || !department_id || !faculty_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    try {
      const connection = await createConnection();
      const [result] = await connection.query(
        `INSERT INTO courses (course_id, course_name, credits, department_id, faculty_id) 
               VALUES (?, ?, ?, ?, ?)`,
        [course_id, course_name, credits, department_id, faculty_id]
      );
      await connection.end();
      
      res.status(201).json({
        course_id, 
        course_name, 
        credits, 
        department_id, 
        faculty_id
      });
    } catch (err) {
      console.error('Error inserting data into Course:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

// Get a course by ID (GET)
router.get('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await createConnection();
    const [rows] = await connection.query(
      'SELECT * FROM Courses WHERE course_id = ?',
      [id],
    );
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error('Error fetching course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a course by ID (PUT)
router.put('/courses/:id', async (req, res) => {
  const { id } = req.params;
  const { course_name, credits, department_id } = req.body;

  try {
    const connection = await createConnection();
    const [result] = await connection.query(
      `UPDATE courses SET course_name = ?, credits = ?, department_id = ?
             WHERE course_id = ?`,
      [course_name, credits, department_id, id],
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully' });
  } catch (err) {
    console.error('Error updating course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/courses/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const connection = await createConnection();
    const [result] = await connection.query(
      'DELETE FROM Courses WHERE course_id = ?',
      [id],
    );
    await connection.end();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('Error deleting course:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
