exports.up = function (knex) {
  return knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("title");
    table.string("description");
    table.string("date");
    table.string("repo");
    table.string("url");
    table.string("thumbnail");
    table.integer("index-priority");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("projects");
};
