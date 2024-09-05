import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

router.post('/enrollment', async (req, res) => {
    const {  enrollment_id, department_id, enrollment_date, student_id } = req.body;

    if (!department_id || !enrollment_date) {
        return res.status(400).json({ error: 'Enrollment ID and Enrollment Date are required' });
    }

    try {

        const formattedDate = new Date(enrollment_date).toISOString().slice(0, 19);

        const connection = await createConnection();
        const [result] = await connection.query(
            'INSERT INTO Enrollment (enrollment_id, department_id, enrollment_date, student_id) VALUES (?, ?, ?, ?)',
            [enrollment_id, department_id, formattedDate, student_id]
        );
        await connection.end();
        res.status(201).json({ enrollment_id, department_id, enrollment_date: formattedDate, student_id });
    } catch (err) {
        console.error('Error inserting data into Enrollment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/enrollments', async (req, res) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Enrollment ');
        await connection.end();
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching data from Enrollment:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

router.get('/enrollment/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Enrollment WHERE enrollment_id = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Enrollment not found'});
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching data from Enrollment:', err);
        res.status(500).json({ error: 'Internal server error'});
    }
});

router.delete('/enrollment/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [result] = await connection.query('DELETE FROM Enrollment WHERE enrollment_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json({ message: 'Enrollment deleted successfully' });
    } catch (err) {
        console.error('Error deleting Enrollment:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;
