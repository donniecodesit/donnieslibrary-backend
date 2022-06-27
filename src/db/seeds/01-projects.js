const projects = require("./01-projects.json");

exports.seed = function (knex) {
  return knex
    .raw("TRUNCATE TABLE projects RESTART IDENTITY CASCADE")
    .then(() => {
      return knex("projects").insert(projects);
    });
};
