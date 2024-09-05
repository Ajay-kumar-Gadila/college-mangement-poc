import express from 'express';
import { createDatabase } from './databaseSetup.js';
import departmentService from './api/departmentService.js';
import enrollmentService from './api/enrollmentService.js';
import studentService from './api/studentsService.js';
import coursesService from './api/coursesService.js';
import facultyService from './api/facultyService.js'
import examinationService from './api/examinationService.js';
import subjectsService from './api/subjectService.js';
import resultService from './api/resultService.js';

const app = express();
app.use(express.json()); 

app.use('/api', departmentService);
app.use('/api', enrollmentService);
app.use('/api', studentService);
app.use('/api', coursesService);
app.use('/api', facultyService);
app.use('/api',examinationService);
app.use('/api',subjectsService);
app.use('/api',resultService);
createDatabase().then(() => {
    console.log('Database and tables setup completed.');

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

}).catch((err) => {
    console.error('Error setting up the database and tables:', err);
});