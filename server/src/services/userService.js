const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get user by username
async function getUserByUsername(username) {
  return prisma.user.findUnique({
    where: {
      username,
    },
  });
}

// get user by id
async function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

// pitäis palauttaa kontrolleriin että voi tarkistaa onnistuiko luonti
// creates a new user to db
async function createUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password_hash: password,
    },
    select: {
      id: true,
      username: true,
    },
  });
}

// pitäis palauttaa kontrolleriin arvoja että tietää mitä poistettiin ja onnistuiko poisto
// delete user from db
async function deleteUser(username, password) {
  const deletedUser = await prisma.user.delete({
    where: {
      username,
      password,
    },
    select: {
      id: true,
      username: true,
    },
  });
}

// pitäis palauttaa kontrolleriin se päivitetty käyttäjä et kontrolleri voi palauttaa sen fronttiin
// edit user in db
async function editUser(username, password) {
  const updateUser = await prisma.user.update({
    where: {
      username,
      password,
    },
    data: {
      username,
      password,
    },
    select: {
      id: true,
      username: true,
    },
  });
}

// all courses that user is lecturing or enrolled in
async function getUserCourses(id) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      lecturedCourses: true,
      enrolledCourses: {
        select: {
          course: true,
        },
      },
    },
  });

  return {
    ...user.lecturedCourses,
    ...user.enrolledCourses.map((enrollment) => enrollment.course),
  };
}

module.exports = {
  getUserByUsername,
  createUser,
  deleteUser,
  editUser,
  getUserById,
  getUserCourses,
};
