import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

// Create a new result (POST)
router.post('/results', async (req, res) => {
    const { result_id , student_id, subject_id, semester, year, marks, grade, semester_average } = req.body;

    if (student_id === undefined || subject_id === undefined || semester === undefined || year === undefined || marks === undefined || grade === undefined || semester_average === undefined) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `INSERT INTO Result (result_id , student_id, subject_id, semester, year, marks, grade, semester_average) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [result_id ,student_id, subject_id, semester, year, marks, grade, semester_average]
        );
        await connection.end();
        res.status(201).json({ result_id, student_id, subject_id, semester, year, marks, grade, semester_average });
    } catch (err) {
        console.error('Error inserting data into Result:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a result by ID (GET)
router.get('/results/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Result WHERE result_id = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching result:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a result by ID (PUT)
router.put('/results/:id', async (req, res) => {
    const { id } = req.params;
    const { student_id, subject_id, semester, year, marks, grade, semester_average } = req.body;

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `UPDATE Result SET student_id = ?, subject_id = ?, semester = ?, year = ?, marks = ?, grade = ?, semester_average = ?
             WHERE result_id = ?`,
            [student_id, subject_id, semester, year, marks, grade, semester_average, id]
        );
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json({ message: 'Result updated successfully' });
    } catch (err) {
        console.error('Error updating result:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a result by ID (DELETE)
router.delete('/results/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [result] = await connection.query('DELETE FROM Result WHERE result_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Result not found' });
        }

        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (err) {
        console.error('Error deleting result:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
