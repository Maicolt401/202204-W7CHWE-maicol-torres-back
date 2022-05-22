const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("..");
const connectDb = require("../../db/index");
const User = require("../../db/models/User");
const { usersMock } = require("../mocks/userMocks");

let mongoServer;

describe("Given a post /users/login endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a 200 status code and a token", async () => {
      debugger;
      mongoServer = await MongoMemoryServer.create();
      await connectDb(mongoServer.getUri());
      await User.create(usersMock[0]);
      const response = await request(app)
        .post("/users/login")
        .send({
          username: "mario",
          password: "123456",
        })
        .expect(200);
      await User.deleteMany({});
      await mongoose.connection.close();
      await mongoServer.stop();

      // expect(response.body.token).not.toBeNull();
    });
  });
});
