const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const gamesRouter = require("./games/games.router");

const app = express();
app.use(express.json());
app.use("/games", gamesRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;