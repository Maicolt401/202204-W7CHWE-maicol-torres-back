const { notFoundError, generalError } = require("./errors");

const res = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
describe("Given a notfound error funtion", () => {
  describe("when ITS INVOKED ", () => {
    test("then it should call the response method status with a 404", () => {
      const expectStatus = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(expectStatus);
    });
  });
  test("then it should  call the response method json with a message `404 endpoint Not Found`", () => {
    const exptedResponmde = { msg: "404 endpoint Not Found" };

    notFoundError(null, res);

    expect(res.json).toHaveBeenCalledWith(exptedResponmde);
  });
});

describe("given a general error funtion", () => {
  describe("when its invoked with a responser", () => {
    test("then it should call method the responses  method status with a 500", () => {
      const expedStatusCode = 500;
      const error = new Error();
      generalError(error, null, res);

      expect(res.status).toHaveBeenCalledWith(expedStatusCode);
    });
  });
  test("then it should call the response method json with a msg general pit ", () => {
    const exptedgeneralpet = {
      msg: "server error",
    };
    const error = new Error();

    generalError(error, null, res);
    expect(res.json).toHaveBeenCalledWith(exptedgeneralpet);
  });
});
