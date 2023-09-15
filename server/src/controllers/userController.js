const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
const middleware = require('../middlewares')

//TODO: Tänne delete user / modify user ym

router.get("/", checkToken, async (req, res) => {
    // tän pitäis palauttaa kaikki käyttäjät databasesta
})

router.get("/:id", checkToken, async (req, res) => {
    // tän pitäis palauttaa tietty käyttäjä urlissa parametrina olevan idn perusteella
})

router.put("/:id", checkToken, async (req, res) => {
    // tällä pitäis pystyä päivittään tietyn käyttäjän tietoja. Pitää siis huolehtia, että käyttäjä voi päivittää vaan omia käyttäjätietojaan
})

router.delete("/:id", checkToken, async (req, res) => {
    // tällä pitäis pystyä poistamaan käyttäjä (pitää taas huolehtii samast ku ylemmässä)
})

router.get("/:id/courses", checkToken, async (req, res) => {
    // palauttaa kurssit, joissa käyttäjä on. Tarvitaan esim siihen ku näytetään frontin dashboardissa niitä kursseja.
})

router.get("/:id/feedback", checkToken, async (req, res) => {
    // pitäis palauttaa kaikki käyttäjän antamat palautteet
    // tähän tarvitaan myöhemmin kans toinen middleware, joka sit tarkastaa onko requestin lähettäny opettaja/admin tjsp ku ei haluta näyttää tuloksia kaikille
})