import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

// Create a new student (POST)
router.post('/students', async (req, res) => {
    const { student_id, first_name, last_name, email, mobile_number, gender, age, date_of_birth, address, father, department_id } = req.body;

    if (!first_name || !last_name || !email || !mobile_number) {
        return res.status(400).json({ error: 'First name, last name, email, and mobile number are required' });
    }

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `INSERT INTO Students (student_id, first_name, last_name, email, mobile_number, gender, age, date_of_birth, address, father, department_id) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [student_id, first_name, last_name, email, mobile_number, gender, age, date_of_birth, address, father, department_id]
        );
        await connection.end();
        res.status(201).json({ student_id, first_name, last_name, email, mobile_number, gender, age, date_of_birth, address, father, department_id });
    } catch (err) {
        console.error('Error inserting data into Students:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a student by ID (GET)
router.get('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Students WHERE student_id = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a student by ID (PUT)
router.put('/students/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, mobile_number, gender, age, date_of_birth, address, father, department_id } = req.body;

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `UPDATE Students SET first_name = ?, last_name = ?, email = ?, mobile_number = ?, gender = ?, age = ?, date_of_birth = ?, address = ?, father = ?, department_id = ?
             WHERE student_id = ?`,
            [first_name, last_name, email, mobile_number, gender, age, date_of_birth, address, father, department_id, id]
        );
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ message: 'Student updated successfully' });
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a student by ID (DELETE)
router.delete('/students/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [result] = await connection.query('DELETE FROM Students WHERE student_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
