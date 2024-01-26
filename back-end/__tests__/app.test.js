const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seedTestDatabase = require("../db/seed/seedTest");

afterAll(() => {
  db.end();
});

beforeEach(async () => {
  try {
    await seedTestDatabase();
  } catch (error) {
    console.error('Error seeding test database:', error);
    throw error;
  }
});


describe("GET /api/v1/students", () => {
  test("should return status 200 and an array of students", async () => {
    const response = await request(app).get("/api/v1/students");
    expect(response.status).toBe(200);
    expect(response.body.students).toEqual(expect.any(Array));
  });
});
