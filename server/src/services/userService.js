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

async function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

// todo: pitäis palauttaa kontrolleriin että voi tarkistaa onnistuiko luonti
// luodaan tietokantaan uusi user
async function createUser(username, password) {
  const user = await prisma.user.create({
    data: {
      username,
      password_hash: password,
    },
  });
}

// todo: pitäis palauttaa kontrolleriin arvoja että tietää mitä poistettiin ja onnistuiko poisto
// poistetaan käyttäjä tietokannasta
async function deleteUser(username, password) {
  const deletedUser = await prisma.user.delete({
    where: {
      username,
      password,
    },
  });
}

// todo: pitäis palauttaa kontrolleriin se päivitetty käyttäjä et kontrolleri voi palauttaa sen fronttiin
// muokataan käyttäjää
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
      username: true,
    },
  });
}

// todo: tää pitäis varmaa siirtää courseServiceen ku tää on kurssiin liittyvä funktio eikä käyttäjään
// courses by user
async function getUserCourses(user) {
  const course = await prisma.course.findMany({
    where: {
      user,
    },
    select: {
      courses: true,
    },
  });
}

module.exports = {
  getUserByUsername,
  createUser,
  deleteUser,
  editUser,
  getUserById,
};
