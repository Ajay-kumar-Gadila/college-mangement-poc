// import { executeSQLFile } from './dbConnection.js';

// async function setupDatabase() {
//   try {
//     await executeSQLFile('./college_schema.sql');
//   } catch (err) {
//     console.error('Error setting up the database:', err);
//   }
// }

// setupDatabase();

// index.js
import { createDatabase } from './databaseSetup.js';

createDatabase();
