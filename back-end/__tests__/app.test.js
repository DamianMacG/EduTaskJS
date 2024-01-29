const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seed/seed");
const testData = require("../db/test-data/index");

afterAll(() => {
  db.end();
});

beforeEach(async () => {
  try {
    await seed(testData);
  } catch (error) {
    console.error("Error seeding test database:", error);
    throw error;
  }
});

describe("GET /api/v1/students", () => {
  test("should return status 200 and an array of students", async () => {
    const response = await request(app).get("/api/v1/students");
    expect(response.status).toBe(200);
    expect(response.body.students).toEqual(expect.any(Array));
    expect(response.body.students).toHaveLength(12);
  });
});

describe("GET /api/v1/students/:id", () => {
  test("should return status 200 and a single student by ID with all properties", async () => {
    const response = await request(app).get("/api/v1/students/1");
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body.student).toHaveLength(1);
    const student = response.body.student[0];
    expect(student).toHaveProperty("id", 1);
    expect(student).toHaveProperty("name", "Grace Taylor");
    expect(student).toHaveProperty("age", 19);
    expect(student).toHaveProperty("email", "grace@example.com");
    expect(student).toHaveProperty("role", "student");

    const expectedStudent = {
      id: 1,
      name: "Grace Taylor",
      age: 19,
      email: "grace@example.com",
      role: "student",
    };
    expect(student).toMatchObject(expectedStudent);
  });
  // test("should return status 404 for non-existent student ID", async () => {
  //   const response = await request(app).get("/api/v1/students/999");
  //   expect(response.status).toBe(404);
  // });
});

describe("404 Route", () => {
  test("should respond with a 404 status and a 'Not found' message", async () => {
    const response = await request(app).get("/nonexistent-route");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({ msg: "Not found" });
  });
});

describe("GET /api/v1/teachers", () => {
  test("should return status 200 and an array of teachers", async () => {
    const response = await request(app).get("/api/v1/teachers");
    expect(response.status).toBe(200);
    expect(response.body.teachers).toEqual(expect.any(Array));
    expect(response.body.teachers).toHaveLength(12);
  });
});

describe("GET /api/v1/teachers/:id", () => {
  test("should return status 200 and a single teacher by ID with all properties", async () => {
    const response = await request(app).get("/api/v1/teachers/1");
    expect(response.status).toBe(200);
   
    expect(response.body.teacher).toHaveLength(1);
    const teacher = response.body.teacher[0];
    expect(teacher).toHaveProperty("id", 1);
    expect(teacher).toHaveProperty("name", "Teacher Smith");
    expect(teacher).toHaveProperty("email", "smith@example.com");
    expect(teacher).toHaveProperty("role", "teacher");

    const expectedTeacher = {
      id: 1,
      name: "Teacher Smith",
      email: "smith@example.com",
      role: "teacher",
    };

    expect(teacher).toMatchObject(expectedTeacher);
  });

  // test("should return status 404 for non-existent teacher ID", async () => {
  //   const response = await request(app).get("/api/v1/teachers/999");
  //   expect(response.status).toBe(404);
  // });
});
