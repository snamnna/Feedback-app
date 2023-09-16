const express = require("express");

const router = express.Router();
const bcrypt = require("bcrypt");
const userService = require("../services/userService");

// todo: try-catchit pois ja käytä custom erroria ja error handleria
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userExists = await userService.getUserByUsername(username);

    if (userExists) {
      console.log("käyttäjänimi/käyttäjä löytyy jo");

      return res.status(401).json({ message: "Email is already in use." });
    }

    const saltRounds = 10;

    // Hashing password
    const hash = await bcrypt.hash(password, saltRounds);

    const nuser = await userService.createUser(username, hash);

    // res.json({ message: "User created successfully", user: nuser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
  // todo: lähetetään onnistunut response tässä, ei tarvii palauttaa mitään ku halutaan vaan ilmottaa et käyttäjä luotu ja voi kirjautua sisään
  return res.status(200).json({ message: "User created successfully" });
});
module.exports = router;
