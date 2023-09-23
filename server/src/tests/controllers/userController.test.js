const request = require("supertest");
const app = require("../../app"); // adjust the path to your app.js file
const userService = require("../../services/userService");
const verifyToken = require("../../middlewares/verifyToken");

jest.mock("../../services/userService");
jest.mock("../../middlewares/verifyToken");

describe("User Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should get user by id", async () => {
    const userId = 1;
    const mockUser = { id: userId, username: "testUser" };
    userService.getUserById.mockReturnValue(mockUser);

    // Mock the verifyToken middleware to call next()
    verifyToken.mockImplementation((req, res, next) => next());

    const res = await request(app).get(`/api/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUser);
    expect(userService.getUserById).toHaveBeenCalledWith(userId);
  });

  it("should update user", async () => {
    const userId = 1;
    const mockUser = {
      id: userId,
      username: "updatedUser",
      password_hash: "updatedPass",
    };
    userService.editUser.mockResolvedValue(mockUser);

    verifyToken.mockImplementation((req, res, next) => {
      req.user = { id: userId };
      next();
    });

    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ username: "updatedUser", password: "updatedPass" })
      .set("Authorization", "Bearer someToken"); // Mock authorization header

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockUser);
  });

  it("should delete user", async () => {
    const userId = 1;
    const mockUser = {
      id: userId,
      username: "test",
      password_hash: "pass",
    };
    userService.getUserById.mockResolvedValue(mockUser);
    userService.deleteUser.mockResolvedValue(mockUser);

    verifyToken.mockImplementation((req, res, next) => {
      req.user = { id: userId };
      next();
    });

    const res = await request(app).delete(`/api/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toEqual({ message: "User deleted successfully" });
    expect(userService.deleteUser).toHaveBeenCalledExactlyOnceWith(userId);
  });
});
