const knex = require("../db/connection");

function list() {
    return knex("games")
        .select("*")
        .orderBy("game_title");
}

function read(game_id) {
    return knex("games")
        .where({ game_id })
        .first();
}

function create(game) {
    return knex("games")
        .insert(game)
        .returning("*")
        .then((newGame) => newGame[0]);
}

module.exports = {
    list,
    read,
    create
}