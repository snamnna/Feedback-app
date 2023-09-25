const jwt = require("jsonwebtoken");
const { tokenSign, tokenDecode, secretKey } = require("../../utils/jwtUtils");

jest.mock("jsonwebtoken");

describe("JWT Utils", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should correctly sign the payload", () => {
    const mockPayload = { id: 1, username: "testUser" };
    const mockToken = "mockedToken";

    jwt.sign.mockReturnValue(mockToken);

    const result = tokenSign(mockPayload);

    expect(jwt.sign).toHaveBeenCalledWith(mockPayload, secretKey, {
      expiresIn: "1h",
    });
    expect(result).toBe(mockToken);
  });

  it("should correctly decode the token", async () => {
    const mockToken = "mockedToken";
    const mockDecodedPayload = { id: 1, username: "testUser" };

    jwt.verify.mockImplementation((token, key, callback) =>
      callback(null, mockDecodedPayload),
    );

    const decoded = await tokenDecode(mockToken);

    expect(decoded).toEqual(mockDecodedPayload);
  });

  it("should throw an error for an invalid token", async () => {
    const mockToken = "invalidToken";

    jwt.verify.mockImplementation((token, key, callback) =>
      callback(new Error("Invalid token"), null),
    );

    await expect(tokenDecode(mockToken)).rejects.toThrow("Invalid token");
  });
});
