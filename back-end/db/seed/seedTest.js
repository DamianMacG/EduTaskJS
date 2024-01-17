const { Pool } = require("pg");
const format = require("pg-format");
require("dotenv").config();

const testStudentsData = require("../test-data/students");
const testTeachersData = require("../test-data/teachers");
const testAssignmentsData = require("../test-data/assignments");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const seedTestDatabase = async () => {
  try {
    await pool.query(
      "DROP TABLE IF EXISTS students, teachers, assignments CASCADE"
    );

    await pool.query(`
      CREATE TABLE students (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE teachers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(20) NOT NULL,
        password VARCHAR(255) NOT NULL
      );

      CREATE TABLE assignments (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date TIMESTAMP,
        teacher_id INT REFERENCES teachers(id)
      );
    `);

    const studentsValues = testStudentsData.map((student) => [
      student.name,
      student.age,
      student.email,
      student.role,
      student.password,
    ]);

    const teachersValues = testTeachersData.map((teacher) => [
      teacher.name,
      teacher.email,
      teacher.role,
      teacher.password,
    ]);

    const assignmentsValues = testAssignmentsData.map((assignment) => [
      assignment.title,
      assignment.description,
      assignment.due_date,
      assignment.teacherId,
    ]);

    await pool.query(
      format(
        "INSERT INTO students (name, age, email, role, password) VALUES %L",
        studentsValues
      )
    );

    await pool.query(
      format(
        "INSERT INTO teachers (name, email, role, password) VALUES %L",
        teachersValues
      )
    );

    await pool.query(
      format(
        "INSERT INTO assignments (title, description, due_date, teacher_id) VALUES %L",
        assignmentsValues
      )
    );

    console.log("Test database seeded successfully");
  } catch (error) {
    console.error("Error seeding test database:", error);
  } finally {
    await pool.end();
  }
};

seedTestDatabase();
