const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const cors = require("cors");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const gamesRouter = require("./games/games.router");
const projectsRouter = require("./projects/projects.router");
const commentsRouter = require("./comments/comments.router");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/games", gamesRouter);
app.use("/projects", projectsRouter);
app.use("/comments", commentsRouter);
app.use(notFound);
app.use(errorHandler);

module.exports = app;