const games = require("./00-games.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE games RESTART IDENTITY CASCADE")
    .then(() => {
      return knex("games").insert(games);
    });
};