const knex = require("../db/connection");

function list() {
    return knex("projects")
        .select("*")
        .orderBy("index-priority");
}

function read(id) {
    return knex("projects")
        .where({ id })
        .first();
}

function create(project) {
    return knex("projects")
        .insert(project)
        .returning("*")
        .then((newProject) => newProject[0]);
}

module.exports = {
    list,
    read,
    create
}