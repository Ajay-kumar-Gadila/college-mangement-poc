import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

// Create a new subject (POST)
router.post('/subjects', async (req, res) => {
    const { subject_id, subject_name, course_id } = req.body;

    if (!subject_id || !subject_name || !course_id) {
        return res.status(400).json({ error: 'Subject ID, Subject name, and Course ID are required' });
    }

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `INSERT INTO Subjects (subject_id, subject_name, course_id) VALUES (?, ?, ?)`,
            [subject_id, subject_name, course_id]
        );
        await connection.end();

        res.status(201).json({
            subject_id,
            subject_name,
            course_id
        });
    } catch (err) {
        console.error('Error inserting data into Subjects:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// Get a subject by ID (GET)
router.get('/subjects/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Subjects WHERE subject_id = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching subject:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a subject by ID (PUT)
router.put('/subjects/:id', async (req, res) => {
    const { id } = req.params;
    const { subject_name, course_id } = req.body;

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `UPDATE Subjects SET subject_name = ?, course_id = ? WHERE subject_id = ?`,
            [subject_name, course_id, id]
        );
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.status(200).json({ message: 'Subject updated successfully' });
    } catch (err) {
        console.error('Error updating subject:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a subject by ID (DELETE)
router.delete('/subjects/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [result] = await connection.query('DELETE FROM Subjects WHERE subject_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.status(200).json({ message: 'Subject deleted successfully' });
    } catch (err) {
        console.error('Error deleting subject:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
