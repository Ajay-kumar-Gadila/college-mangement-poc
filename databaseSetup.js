import fs from 'fs';
import path from 'path';
import { createConnection } from './dbConnection.js';

export async function createDatabase() {
  const createDbQuery = fs.readFileSync(path.join(process.cwd(), 'create_database.sql'), 'utf-8');
  const createTablesQuery = fs.readFileSync(path.join(process.cwd(), 'create_tables.sql'), 'utf-8');

  const connection = await createConnection();

  try {
    // Create the database
    await connection.query(createDbQuery);
    console.log('Database created successfully!');

    // Use the newly created database
    await connection.query(`USE ${process.env.DB_NAME}`);

    // Create the tables
    await connection.query(createTablesQuery);
    console.log('Tables created successfully!');
  } catch (err) {
    console.error('Error creating database or tables:', err);
  } finally {
    await connection.end();
  }
}
