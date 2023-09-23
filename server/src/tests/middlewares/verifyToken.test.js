const verifyToken = require("../../middlewares/verifyToken");
const { tokenDecode } = require("../../utils/jwtUtils");
const CustomError = require("../../utils/CustomError");

jest.mock("../../utils/jwtUtils");

describe("Verify Token Middleware", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should throw an error if token is missing", async () => {
    const req = {
      headers: {},
    };

    await expect(verifyToken(req, {}, () => {})).rejects.toThrow(
      new CustomError(403, "Token missing"),
    );
  });

  it("should throw an error if token is invalid", async () => {
    const req = {
      headers: {
        authorization: "Bearer invalidtoken",
      },
    };

    // Mocking the tokenDecode function to simulate an invalid token
    tokenDecode.mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await expect(verifyToken(req, {}, () => {})).rejects.toThrow(
      new CustomError(403, "Invalid token"),
    );
  });

  it("should proceed if token is valid", async () => {
    const req = {
      headers: {
        authorization: "Bearer validtoken",
      },
    };

    const mockDecodedToken = { id: 1, username: "testUser" };

    tokenDecode.mockResolvedValue(mockDecodedToken);

    const nextMock = jest.fn();

    await verifyToken(req, {}, nextMock);

    expect(req.user).toEqual(mockDecodedToken);
    expect(nextMock).toHaveBeenCalled();
  });
});
