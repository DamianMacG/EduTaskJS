const request = require("supertest");
const app = require("../app");
const db = require("../db/connection");
const seed = require("../db/seed/seed");
const data = require("../db/test-data/index");

afterAll(() => {
  db.end();
});

beforeEach(() => {
  return seed(data);
});


describe("GET /api/v1/students", () => {
  test("should return status 200 and an array of students", async () => {
    const response = await request(app).get("/api/v1/students");
    console.log(response.body);
    expect(response.status).toBe(200);
    expect(response.body.students).toEqual(expect.any(Array));
  });
});

