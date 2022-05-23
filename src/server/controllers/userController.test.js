const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { loginUser } = require("./userController");
const User = require("../../db/models/User");

const expectedToken = "helloudat";
const user = {
  username: "papafrita",
  id: "48",
};

jest.mock("../../db/models/User", () => ({
  ...jest.requireActual("../../db/models/User"),
  create: jest.fn(),
  findOne: jest.fn(),
}));

jest.mock("fs", () => ({
  ...jest.requireActual("fs"),
  rename: jest.fn().mockReturnValue("1234image.jpg"),
}));

jest.mock("../../db/models/User", () => ({
  findOne: jest.fn().mockResolvedValue(user),
}));

jest.mock("bcrypt", () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

jest.mock("jsonwebtoken", () => ({
  sign: () => expectedToken,
}));

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

describe("Given the loginUser function", () => {
  const req = {
    body: {
      username: "papafrita",
      password: "papafrita",
    },
  };

  describe("When it receives a request with the correct username and password and a res", () => {
    test("Then it should response with status 200 and a token in the body", async () => {
      const expectedStatusCode = 200;

      await loginUser(req, res, null);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call res' json method with {token: 'helloudat'}", async () => {
      const expectedJson = { token: "helloudat" };

      await loginUser(req, res, null);

      expect(res.json).toHaveBeenCalledWith(expectedJson);
    });
  });

  describe("When its invoked with a req with a wrong username", () => {
    test("Then it should call next", async () => {
      jest.spyOn(User, "findOne").mockResolvedValue(false);

      const next = jest.fn();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When its invoked with a req with a orrect user but a wrong password", () => {
    test("Then it should call next", async () => {
      jest.spyOn(User, "findOne").mockResolvedValue(true);
      jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
      jest.spyOn(jwt, "sign").mockReturnValue(expectedToken);

      const next = jest.fn();

      await loginUser(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
