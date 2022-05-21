const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");

const User = require("../../db/models/User");
const { app } = require("../index");
const connectDb = require("../../db/index");
const { usersMock } = require("../mocks/userMocks");

let mongoServer;
let users;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await connectDb(mongoServer.getUri());
});

beforeEach(async () => {
  await User.create(users[0]);
  await User.create(users[1]);
});

afterEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Given a Get '/login'", () => {
  describe("When it receives a request", () => {
    users = usersMock;
    test("Then it should return a response with a status 200 and a list of users", async () => {
      const { body } = await request(app).get("/users/login").expect(200);

      expect(body.users).toHaveLength(users.length);
    });
  });
});
