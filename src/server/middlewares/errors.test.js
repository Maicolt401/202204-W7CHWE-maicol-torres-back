const { notFoundError } = require("./errors");

describe("Given a notfound error funtion", () => {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
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
