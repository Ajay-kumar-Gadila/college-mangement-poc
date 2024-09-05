CREATE TABLE
  IF NOT EXISTS Department (
    department_id INT PRIMARY KEY,
    department_name VARCHAR(256)
  );

CREATE TABLE
  IF NOT EXISTS Enrollment (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    department_id INT,
    enrollment_date TIMESTAMP,
    FOREIGN KEY (department_id) REFERENCES Department (department_id)
  );

CREATE TABLE
  IF NOT EXISTS Students (
    student_id INT PRIMARY KEY,
    first_name VARCHAR(256),
    last_name VARCHAR(256),
    email VARCHAR(520),
    mobile_number CHAR(10) NOT NULL,
    gender VARCHAR(256),
    age VARCHAR(50),
    date_of_birth TIMESTAMP,
    address VARCHAR(256),
    father VARCHAR(256),
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department (department_id),
    CHECK (mobile_number REGEXP '^[0-9]{10}$')
  );

ALTER TABLE Enrollment
ADD COLUMN student_id INT;

ALTER TABLE Enrollment ADD CONSTRAINT fk_student FOREIGN KEY (student_id) REFERENCES Students (student_id);
-- set 1 
CREATE TABLE
  IF NOT EXISTS Courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(256),
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department (department_id)
  );

CREATE TABLE
  IF NOT EXISTS Faculty (
    faculty_id INT PRIMARY KEY,
    first_name VARCHAR(256),
    last_name VARCHAR(256),
    email VARCHAR(256),
    years_of_experience INT,
    mobile_no CHAR(10) NOT NULL,
    qualification VARCHAR(256),
    employee_id INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES Department (department_id),
    CHECK (mobile_no REGEXP '^[0-9]{10}$')
  );

ALTER TABLE courses ADD faculty_id INT;

ALTER TABLE Courses ADD CONSTRAINT fk_faculty FOREIGN KEY (faculty_id) REFERENCES Faculty (faculty_id);

CREATE TABLE
  IF NOT EXISTS Subjects (
    subject_id INT PRIMARY KEY,
    subject_name VARCHAR(256),
    course_id INT,
    FOREIGN KEY (course_id) REFERENCES Courses (course_id)
  );

CREATE TABLE
  IF NOT EXISTS Examination (
    exam_id INT PRIMARY KEY,
    exam_date DATE,
    subject_id INT,
    faculty_id INT,
    exam_fee DECIMAL(10, 2),
    college_fee DECIMAL(10, 2),
    location VARCHAR(256),
    FOREIGN KEY (subject_id) REFERENCES Subjects (subject_id),
    FOREIGN KEY (faculty_id) REFERENCES Faculty (faculty_id)
  );

CREATE TABLE
  IF NOT EXISTS Result (
    result_id INT PRIMARY KEY,
    student_id INT,
    subject_id INT,
    semester INT,
    year INT,
    marks DECIMAL(5, 2),
    grade VARCHAR(2),
    semester_average DECIMAL(5, 2),
    FOREIGN KEY (student_id) REFERENCES Students (student_id),
    FOREIGN KEY (subject_id) REFERENCES Subjects (subject_id)
  );