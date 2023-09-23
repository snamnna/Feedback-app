const request = require("supertest");
const bcrypt = require("bcrypt");
const app = require("../../app");
const userService = require("../../services/userService");
const jwtUtils = require("../../utils/jwtUtils");

jest.mock("../../services/userService");
jest.mock("bcrypt");
jest.mock("../../utils/jwtUtils");

describe("Authentication Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should authenticate a user", async () => {
    const mockUsername = "testUser";
    const mockPassword = "password";
    const mockHash = "hashedPassword";
    const mockUser = { username: mockUsername, password_hash: mockHash };
    const mockToken = "jwtToken";

    userService.getUserByUsername.mockResolvedValue(mockUser);
    jwtUtils.tokenSign.mockResolvedValue(mockToken);
    bcrypt.compare.mockResolvedValue(true);

    const res = await request(app)
      .post("/api/auth")
      .send({ username: mockUsername, password: mockPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: "User Logged in Successfully",
      token: mockToken,
      user: mockUser,
    });
    expect(userService.getUserByUsername).toHaveBeenCalledExactlyOnceWith(
      mockUsername,
    );
    expect(bcrypt.compare).toHaveBeenCalledExactlyOnceWith(
      mockPassword,
      mockHash,
    );
  });

  it("should not authenticate a user with invalid credentials", async () => {
    const mockUsername = "testUser";
    const mockPassword = "password";

    userService.getUserByUsername.mockResolvedValue(null);

    const res = await request(app)
      .post("/api/auth")
      .send({ username: mockUsername, password: mockPassword });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "Invalid Credentials" });
    expect(userService.getUserByUsername).toHaveBeenCalledExactlyOnceWith(
      mockUsername,
    );
    expect(bcrypt.compare).not.toHaveBeenCalled();
  });
});
