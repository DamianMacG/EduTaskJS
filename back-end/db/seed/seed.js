const format = require("pg-format");
const pool = require("../connection");

const seed = async ({ students, teachers, assignments }) => {
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
        role VARCHAR(20) NOT NULL
      );

      CREATE TABLE teachers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        role VARCHAR(20) NOT NULL
      );

      CREATE TABLE assignments (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date DATE,
        teacher_id INT REFERENCES teachers(id)
      );
    `);

    // Insert data into tables
    const studentsValues = students.map((student) => [
      student.name,
      student.age,
      student.email,
      student.role,
    ]);

    const teachersValues = teachers.map((teacher) => [
      teacher.name,
      teacher.email,
      teacher.role,
    ]);

    await pool.query(
      format(
        "INSERT INTO students (name, age, email, role) VALUES %L",
        studentsValues
      )
    );

    await pool.query(
      format(
        "INSERT INTO teachers (name, email, role) VALUES %L",
        teachersValues
      )
    );

    // Insert assignments with correct teacher_id
    for (const assignment of assignments) {
      await pool.query(
        `INSERT INTO assignments (title, description, due_date, teacher_id)
         VALUES ($1, $2, $3, (SELECT id FROM teachers WHERE id = $4))`,
        [assignment.title, assignment.description, assignment.due_date, assignment.teacher_id]
      );
    }
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

module.exports = seed;
