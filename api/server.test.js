const request = require("supertest");
const db = require("../data/dbConfig");
const server = require("./server");

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});
beforeEach(async () => {
  await db("users").truncate();
});
afterAll(async () => {
  await db.destroy();
});

test("sanity", () => {
  expect(true).toBe(true);
});
describe("api testing", () => {
  describe("register endpoint", () => {
    test("correct response for valid register", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "Pinky", password: "1234" });
      expect(res.status).toBe(201);
      expect(res.body.username).toMatch(/pinky/i);
      expect(res.body.password).toBeTruthy();
      expect(res.body.id).toBeTruthy();
    });
    test("correct response for invalid register", async () => {
      const res = await request(server)
        .post("/api/auth/register")
        .send({ username: "Pinky", password: "" });
      expect(res.status).toBe(400);
      expect(res.body).toMatch(/username/i);
    });
  });
  describe("Login endpoint", () => {
    test("correct response for invalid login", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({
          username: "Pinky",
          password:
            "$2a$08$1pMDgff6lEg6uHj66UBL/uObtE.EDXTrl5jGV7SN8JOgo/uZ1BcVa",
        });
      // expect(res.status).toBe(200);
      expect(res.body).toMatch(" ");
      expect(res.body.token).toBeTruthy();
    });
  });
});
