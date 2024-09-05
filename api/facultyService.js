import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

// Create a new student (POST)
router.post('/faculty', async (req, res) => {
    const { faculty_id, first_name, last_name, email, years_of_experience, mobile_no, qualification, employee_id, department_id } = req.body;

    if (!first_name || !last_name || !email || !mobile_no) {
        return res.status(400).json({ error: 'First name, last name, email, and mobile number are required' });
    }

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            `INSERT INTO Faculty (faculty_id, first_name, last_name, email, years_of_experience, mobile_no, qualification, employee_id, department_id ) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [faculty_id, first_name, last_name, email, years_of_experience, mobile_no, qualification, employee_id, department_id ]
        );
        await connection.end();
        res.status(201).json({ faculty_id, first_name, last_name, email, years_of_experience, mobile_no, qualification, employee_id, department_id  });
    } catch (err) {
        console.error('Error inserting data into Faculty:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a student by ID (GET)
router.get('/faculty/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Faculty WHERE faculty_id = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'faculty not found' });
        }

        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching student:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a student by ID (PUT)
router.put('/faculty/:id', async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, years_of_experience, mobile_no, qualification, employee_id, department_id } = req.body;

    try {
        const connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'your_database'
        });

        const [result] = await connection.query(
            `UPDATE faculty SET first_name = ?, last_name = ?, email = ?, years_of_experience = ?, mobile_no = ?, qualification = ?, employee_id = ?, department_id = ? WHERE faculty_id = ?`,
            [first_name, last_name, email, years_of_experience, mobile_no, qualification, employee_id, department_id, id]
        );

        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        res.status(200).json({ message: 'Faculty updated successfully' });
    } catch (err) {
        console.error('Error updating faculty:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Delete a student by ID (DELETE)
router.delete('/faculty/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [result] = await connection.query('DELETE FROM Faculty WHERE faculty_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Faculty not found' });
        }

        res.status(200).json({ message: 'Faculty deleted successfully' });
    } catch (err) {
        console.error('Error deleting faculty:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
