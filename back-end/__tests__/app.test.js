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
  test("should return status 404 for non-existent student ID", async () => {
    const response = await request(app).get("/api/v1/students/999");
    expect(response.status).toBe(404);
  });
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

  test("should return status 404 for non-existent teacher ID", async () => {
    const response = await request(app).get("/api/v1/teachers/999");
    expect(response.status).toBe(404);
  });
});

describe("GET /api/v1/assignments", () => {
  test("should return status 200 and an array of assignments", async () => {
    const response = await request(app).get("/api/v1/assignments");
    expect(response.status).toBe(200);
    expect(response.body.assignments).toEqual(expect.any(Array));
    expect(response.body.assignments).toHaveLength(10);
  });
});

describe("GET /api/v1/assignments/:id", () => {
  test("should return status 200 and a single assignment by ID with all properties", async () => {
    const response = await request(app).get("/api/v1/assignments/1");
    expect(response.status).toBe(200);
    expect(response.body.assignment).toHaveLength(1);
    const assignment = response.body.assignment[0];
    expect(assignment).toHaveProperty("id", 1);
    expect(assignment).toHaveProperty("title", "Newton's Laws of Motion");
    expect(assignment).toHaveProperty(
      "description",
      "Explain the three laws formulated by Sir Isaac Newton and provide examples."
    );
    expect(assignment).toHaveProperty("due_date", "2024-02-10T00:00:00.000Z");
    expect(assignment).toHaveProperty("teacher_id", 3);

    const expectedAssignment = {
      id: 1,
      title: "Newton's Laws of Motion",
      description:
        "Explain the three laws formulated by Sir Isaac Newton and provide examples.",
      due_date: "2024-02-10T00:00:00.000Z",
      teacher_id: 3,
    };

    expect(assignment).toMatchObject(expectedAssignment);
  });
  test("should return status 404 for non-existent assignment ID", async () => {
    const response = await request(app).get("/api/v1/assignments/999");
    expect(response.status).toBe(404);
  });
});

describe("Getting Assignments by Teacher ID", () => {
  test("should retrieve all assignments for a teacher", async () => {
    const teacherId = 3;
    const response = await request(app).get(
      `/api/v1/teachers/${teacherId}/assignments`
    ); 

    console.log(response.body)

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.assignments)).toBe(true);

    // Assert that the response contains specific assignments associated with teacher ID 3
    expect(response.body.assignments).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: "Newton's Laws of Motion",
          description:
            "Explain the three laws formulated by Sir Isaac Newton and provide examples.",
          due_date: "2024-02-10",
          teacher_id: teacherId,
        }),
        expect.objectContaining({
          title: "Cell Biology",
          description:
            "Explore the structure and functions of different cell organelles.",
          due_date: "2024-03-31",
          teacher_id: teacherId,
        }),
      ])
    );
  });

  // test("should return an empty array if the teacher has no assignments", async () => {
  //   const teacherId = 5;
  //   const response = await request(app).get(
  //     `/teachers/${teacherId}/assignments`
  //   );

  //   expect(response.status).toBe(200);
  //   expect(Array.isArray(response.body.assignments)).toBe(true);
  //   expect(response.body.assignments).toHaveLength(0);
  // });

  test("should return 404 if the teacher ID does not exist", async () => {
    const nonExistentTeacherId = 999;
    const response = await request(app).get(
      `/teachers/${nonExistentTeacherId}/assignments`
    );

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Not found");
  });
});
