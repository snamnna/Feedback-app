const request = require("supertest");
const app = require("../../app"); // adjust the path to your app.js file
const userService = require("../../services/userService");
const bcrypt = require("bcrypt");

jest.mock("../../services/userService");
jest.mock("bcrypt");

describe("Registration Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    const mockUsername = "testUser";
    const mockPassword = "password";
    const mockHash = "hashedPassword";

    userService.getUserByUsername.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue(mockHash);

    const res = await request(app)
      .post("/api/register")
      .send({ username: mockUsername, password: mockPassword });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "User created successfully" });
    expect(userService.createUser).toHaveBeenCalledWith(mockUsername, mockHash);
  });

  it("should not register a user if the username is already taken", async () => {
    const mockUsername = "testUser";
    const mockPassword = "password";
    const mockUser = { username: mockUsername };

    userService.getUserByUsername.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/api/register")
      .send({ username: mockUsername, password: mockPassword });

    expect(res.statusCode).toBe(401);
    expect(res.body).toEqual({ message: "username already in use" });
    expect(userService.createUser).not.toHaveBeenCalled();
  });

  it("should return a 400 Bad Request error for invalid input", async () => {
    const invalidData = [
      { username: "abc", password: "password" },
      { username: "testUser", password: "abc" },
      { username: "", password: "password" },
      { username: "testUser", password: "" },
    ];

    for (const data of invalidData) {
      const res = await request(app).post("/api/register").send(data);

      expect(res.statusCode).toBe(400);

      expect(res.body).toHaveProperty("message");
      expect(userService.createUser).not.toHaveBeenCalled();
    }
  });

  it("should handle server errors", async () => {
    const mockUsername = "testUser";
    const mockPassword = "password";

    userService.getUserByUsername.mockImplementation(() => {
      throw new Error("Server error");
    });

    const res = await request(app)
      .post("/api/register")
      .send({ username: mockUsername, password: mockPassword });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "Internal Server Error" });
  });

  it("should handle bcrypt hashing errors", async () => {
    const mockUsername = "testUser";
    const mockPassword = "password";

    userService.getUserByUsername.mockResolvedValue(null);
    bcrypt.hash.mockImplementation(() => {
      throw new Error("Bcrypt error");
    });

    const res = await request(app)
      .post("/api/register")
      .send({ username: mockUsername, password: mockPassword });

    expect(res.statusCode).toBe(500);
    expect(res.body).toEqual({ message: "Internal Server Error" });
    expect(userService.createUser).not.toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalled();
  });
});
