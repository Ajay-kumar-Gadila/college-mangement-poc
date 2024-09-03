
import { createConnection } from './lib/dbConnection.js';

async function runQuery() {
  try {
    const connection = await createConnection();

    await connection.end();
  } catch (err) {
    console.error('Error running query:', err);
  }
}

runQuery();
