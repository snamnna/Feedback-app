const { PrismaClient } = require("@prisma/client");
const {
  getUserByUsername,
  createUser,
  deleteUser,
  editUser,
  getUserById,
  getUserCourses,
} = require("../../services/userService");

const PrismaClientMocked = PrismaClient();

jest.mock("@prisma/client");

describe("User Service", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // getUserByUsername
  it("should fetch a user by username", async () => {
    const mockUsername = "testUser";
    const mockUser = { id: 1, username: mockUsername };

    PrismaClientMocked.user.findUnique.mockResolvedValue(mockUser);

    const result = await getUserByUsername(mockUsername);
    expect(result).toEqual(mockUser);
  });

  // getUserById
  it("should fetch a user by id", async () => {
    const mockId = 1;
    const mockUser = { id: mockId, username: "testUser" };

    PrismaClientMocked.user.findUnique.mockResolvedValue(mockUser);

    const result = await getUserById(mockId);
    expect(result).toEqual(mockUser);
  });

  // createUser
  it("should create a user", async () => {
    const mockUsername = "newUser";
    const mockPassword = "password";
    const mockUser = { username: mockUsername, password_hash: mockPassword };

    PrismaClientMocked.user.create.mockResolvedValue(mockUser);

    const result = await createUser(mockUsername, mockPassword);
    expect(result).toEqual(mockUser);
  });

  // deleteUser
  it("should delete a user with valid id and password", async () => {
    const mockId = 1;
    const mockPassword = "password";
    const mockUser = {
      id: mockId,
      username: "deleteUser",
      password_hash: mockPassword,
    };

    PrismaClientMocked.user.findUnique.mockResolvedValue(mockUser); // Fetch the user to verify password
    PrismaClientMocked.user.delete.mockResolvedValue(mockUser); // Delete the user

    const result = await deleteUser(mockId, mockPassword);
    expect(result).toEqual(mockUser);
  });

  // deleteUser with incorrect password
  it("should not delete a user with invalid credentials", async () => {
    const mockId = 1;
    const mockPassword = "wrongPassword";

    PrismaClientMocked.user.findUnique.mockResolvedValue(null); // Simulate user not found or password mismatch
    PrismaClientMocked.user.delete.mockImplementation(() => {
      throw new Error("Invalid credentials");
    });

    await expect(deleteUser(mockId, mockPassword)).rejects.toThrow(
      "Invalid credentials",
    );
  });

  // editUser
  it("should edit a user with valid id and password", async () => {
    const mockId = 1;
    const mockNewUsername = "editedUser";
    const mockPassword = "password";
    const mockUser = {
      id: mockId,
      username: mockNewUsername,
      password_hash: mockPassword,
    };

    PrismaClientMocked.user.findUnique.mockResolvedValue(mockUser); // Fetch the user to verify password
    PrismaClientMocked.user.update.mockResolvedValue(mockUser); // Edit the user

    const result = await editUser(mockId, mockNewUsername, mockPassword);
    expect(result.username).toEqual(mockNewUsername);
  });

  // getUserCourses
  it("should fetch all courses a user is lecturing or enrolled in", async () => {
    const mockId = 1;
    const mockCourses = [
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
    ];

    PrismaClientMocked.user.findUnique.mockResolvedValue({
      lecturedCourses: mockCourses,
      enrolledCourses: [{ course: { id: 3, name: "Course 3" } }],
    });

    const result = await getUserCourses(mockId);
    expect(result).toEqual(
      expect.arrayContaining([...mockCourses, { id: 3, name: "Course 3" }]),
    );
  });
});
