const express = require('express')
const router = express.Router()
const userService = require('../services/userService');
const jwt = require('jsonwebtoken')
const verifyToken = require('../middlewares/verifyToken')
const courseService = require('../services/courseService')

//TODO: Tänne delete user / modify user ym


// TODO: Requestin lähettäjän id ja username on middlewaren avulla saatavilla req.user.id ja req.user.username muodossa. Tätä voi käyttää sitten vertailuun, että onko käyttäjä sama kuin se jonka tietoja yritetään muokata tai poistaa.
// TODO: Ei tarvitse siis hakea databasesta käyttäjää id:n perusteella tai liittää bodyyn usernamea tai id:tä parametrin lisäksi

router.get("/", verifyToken, async (req, res) => {
    // tän pitäis palauttaa kaikki käyttäjät databasesta ---- tarvitaan medodi joka palauttaisi kaikki, ei yksittäistä?
})

router.get("/:id", verifyToken, async (req, res) => {
    // tän pitäis palauttaa tietty käyttäjä urlissa parametrina olevan idn perusteella

    const userId = req.params.id;

    try{
        const user = userService.getUserById(userId)

        if(user) {
            res.json(user)
        } else{
            res.status(404).json({ error: 'User can not be found'})
        }

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.put("/:id", verifyToken, async (req, res) => {
    // tällä pitäis pystyä päivittään tietyn käyttäjän tietoja. Pitää siis huolehtia, että käyttäjä voi päivittää vaan omia käyttäjätietojaan

    const userId = req.params.id
    //const updated = req.body
    const { username, password } = req.body

    try {

        const user = await userService.getUserById(userId)

        if( !user ){
            return res.status(404).json({ error: "User can not be found"})
        }

        if (user.id !== req.user.id){
            return res.status(403).json({ error: "No permission to update user information"})
        }

        if ( !username || !password ){
            return res.status(403).json({ error: "Please enter username and password"})
        }

        if (user.id === req.user.id) {
            const updated = await userService.editUser(username, password)
            res.json(updated)
        }

    } catch (err) {
        res.status(500).json({ error: "Initial server errorr"})
    }

})

router.delete("/:id", verifyToken, async (req, res) => {
    // tällä pitäis pystyä poistamaan käyttäjä (pitää taas huolehtii samast ku ylemmässä)

    const userId = req.params.id

    try{
        const user = await userService.getUserById(userId)

        if( !user ){
            return res.status(404).json({ error: "User can not be found"})
        }

        if ( user.id !== req.user.id ) {
            return res.status(403).json({ error: "No permission to delete user"})
        }

        if ( !username || !password ){
            return res.status(400).json({ eroor: "Username and password required"})
        }

        if ( user.id === req.user.id ){
            const updated = await userService.deleteUser(username, password)
            res.json(updated)
        }

    } catch (err){

    }
})

router.get("/:id/courses", verifyToken, async (req, res) => {
    // palauttaa kurssit, joissa käyttäjä on. Tarvitaan esim siihen ku näytetään frontin dashboardissa niitä kursseja.

    const userId = req.params.id

    try {
        const user = await userService.checkUserExists(userId)

        if ( !user ){
            return res.status(404).json({ error: "User can not be found"})
        }

        //Tätä ei voi tehdä vielä valmiiksi koska courseServicessä ei metodia jonka avulla saisi käyttäjän kaikki kurssit
        // const courses = await courseService.getUserCourses ....

    } catch (err) {

    }
})

router.get("/:id/feedback", verifyToken, async (req, res) => {
    // pitäis palauttaa kaikki käyttäjän antamat palautteet
    // tähän tarvitaan myöhemmin kans toinen middleware, joka sit tarkastaa onko requestin lähettäny opettaja/admin tjsp ku ei haluta näyttää tuloksia kaikille
})

module.exports = router;
