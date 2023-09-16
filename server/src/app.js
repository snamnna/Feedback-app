const express = require("express");

const app = express();
const cors = require("cors");
require("express-async-errors");
const authController = require("./controllers/authController");
const regController = require("./controllers/regController");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}, body: ${JSON.stringify(req.body)}`);
  next();
});

// Käytetään authcontrolleria reitin hallintaan
app.use("/api/auth", authController);

// Käytetään regcontrolleria reitin hallintaan
app.use("/api/register", regController);

app.use(errorHandler);

module.exports = app;
