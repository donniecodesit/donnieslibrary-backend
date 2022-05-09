exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.increments("game_id").primary();
    table.string("game_title");
    table.string("game_release");
    table.string("game_image");
    table.integer("rating");
    table.boolean("multiplayer");
    table.string("platform");
    table.timestamps(true, true);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
