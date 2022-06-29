const knex = require("../db/connection");

function list() {
    return knex("comments")
        .select("*")
        .orderBy("created_at");
}

function read(id) {
    return knex("comments")
        .where({ id })
        .first();
}

function create(comment) {
    return knex("comments")
        .insert(comment)
        .returning("*")
        .then((newComm) => newComm[0]);
}

module.exports = {
    list,
    read,
    create
}