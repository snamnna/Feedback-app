const app = require('./app');
const port = 3001
const cors = require('cors')
const express = require("express");

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
