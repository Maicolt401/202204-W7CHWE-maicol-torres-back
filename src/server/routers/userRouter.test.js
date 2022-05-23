const request = require("supertest");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const app = require("../index");
const connectDb = require("../../db");
const { usersMock } = require("../mocks/userMocks");
const User = require("../../db/models/User");

let mongoServer;

describe("Given a post endpoint /users/login", () => {
  describe("when it receives a request", () => {
    test("then is should call the status method of res with 200 and a token", async () => {
      mongoServer = await MongoMemoryServer.create();
      await connectDb(mongoServer.getUri);
      await User.create(usersMock[0]);

      const response = await request(app)
        .post("/users/login")
        .send({
          username: "cristhian69",
          password: "notmario",
        })
        .expect(200);

      await User.deleteMany({});

      await mongoServer.stop();
      await mongoose.connection.close();

      expect(response.body.token).not.toBeNull();
    });
  });
});
