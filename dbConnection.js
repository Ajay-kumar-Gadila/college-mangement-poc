import mysql from 'mysql2';
import { DB_CONFIG } from './lib/constants.js';

export async function createConnection() {
  try {
    const connection = await mysql.createConnection({
      host: DB_CONFIG.HOST,
      user: DB_CONFIG.USER,
      password: DB_CONFIG.PASSWORD,
      database: DB_CONFIG.DATABASE,
    });

    console.log('Connected to the database');
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}
