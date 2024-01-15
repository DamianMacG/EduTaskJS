// db/seed/seed.js
const { Pool } = require("pg");
require("dotenv").config();

const studentsData = require("../dev-data/students");
const teachersData = require("../dev-data/teachers");
const assignmentsData = require("../dev-data/assignments");

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const seedDatabase = async () => {
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
    await pool.query(
      "INSERT INTO students (name, age, email, role, password) VALUES $1",
      [
        studentsData.map((student) => [
          student.name,
          student.age,
          student.email,
          student.role,
          student.password,
        ]),
      ]
    );
    await pool.query("INSERT INTO teachers (name, email, password) VALUES $1", [
      teachersData.map((teacher) => [
        teacher.name,
        teacher.email,
        teacher.password,
      ]),
    ]);
    await pool.query(
      "INSERT INTO assignments (title, description, due_date, teacher_id) VALUES $1",
      [
        assignmentsData.map((assignment) => [
          assignment.title,
          assignment.description,
          assignment.due_date,
          assignment.teacherId,
        ]),
      ]
    );

    console.log("Seed data inserted successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await pool.end();
  }
};

seedDatabase();
