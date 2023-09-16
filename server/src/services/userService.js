const { PrismaClient } = require("@prisma/client");
const CustomError = require("../utils/CustomError");

const prisma = new PrismaClient();

// TODO: nyt kun custom error on tehty nii voi throwaa custom erroria aina jos joku menee pieleen eikä tarvi try catcheja
// todo: error handler käsittelee sit ne errorit ja palauttaa ne fronttiin
// todo: samaan tyyliin ku kaks alempaa funktiota
// get user by username
async function getUserByUsername(username) {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!user) throw new CustomError(404, "User not found");
  return user;
}

async function getUserById(id) {
  const user = prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) throw new CustomError(404, "User not found");
  return user;
}

// todo: pitäis palauttaa kontrolleriin että voi tarkistaa onnistuiko luonti
// todo: tai throwaa errori jos ei onnistu nii error handler käsittelee sen ja palauttaa sen fronttiin
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
// todo: tai throwaa errori jos ei onnistu nii error handler käsittelee sen ja palauttaa sen fronttiin
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
// todo: onko username ainut mikä halutaan sen käyttäjän tiedoista palauttaa?
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

// todo: voisko nimee paremmin? Et nimestä jo näkis että tää hakee kurssit missä käyttäjä on lecturer
// todo: tää pitäis kans siirtää courseServiceen ku tää on kurssiin liittyvä funktio eikä käyttäjään
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
