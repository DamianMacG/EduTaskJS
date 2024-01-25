const format = require("pg-format");
const pool = require("../connection");

const seed = async ({ studentsData, teachersData, assignmentsData }) => {
  try {
    // Drop tables if they exist
    await pool.query(
      "DROP TABLE IF EXISTS students, teachers, assignments CASCADE"
    );

    // Create tables
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

    // Insert data into tables
    const studentsValues = studentsData.map((student) => [
      student.name,
      student.age,
      student.email,
      student.role,
      student.password,
    ]);

    const teachersValues = teachersData.map((teacher) => [
      teacher.name,
      teacher.email,
      teacher.role,
      teacher.password,
    ]);

    const assignmentsValues = assignmentsData.map((assignment) => [
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

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seed;
