import express from 'express';
import { createConnection } from '../dbConnection.js';

const router = express.Router();

// Create a new department
router.post('/department', async (req, res) => {
    const { department_id, department_name } = req.body;

    if (!department_id || !department_name) {
        return res.status(400).json({ error: 'Department ID and Name are required' });
    }

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            'INSERT INTO Department (department_id, department_name) VALUES (?, ?)',
            [department_id, department_name]
        );
        await connection.end();
        res.status(201).json({ id: result.insertId, department_id, department_name });
    } catch (err) {
        console.error('Error inserting data into Department:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all departments
router.get('/departments', async (req, res) => {
    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Department');
        await connection.end();
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching data from Department:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get a department by ID
router.get('/department/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [rows] = await connection.query('SELECT * FROM Department WHERE department_id = ?', [id]);
        await connection.end();

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json(rows[0]);
    } catch (err) {
        console.error('Error fetching data from Department:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Update a department by ID
router.put('/department/:id', async (req, res) => {
    const { id } = req.params;
    const { department_name } = req.body;

    if (!department_name) {
        return res.status(400).json({ error: 'Department Name is required' });
    }

    try {
        const connection = await createConnection();
        const [result] = await connection.query(
            'UPDATE Department SET department_name = ? WHERE department_id = ?',
            [department_name, id]
        );
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json({ message: 'Department updated successfully' });
    } catch (err) {
        console.error('Error updating Department:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Delete a department by ID
router.delete('/department/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const connection = await createConnection();
        const [result] = await connection.query('DELETE FROM Department WHERE department_id = ?', [id]);
        await connection.end();

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Department not found' });
        }
        res.status(200).json({ message: 'Department deleted successfully' });
    } catch (err) {
        console.error('Error deleting Department:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
