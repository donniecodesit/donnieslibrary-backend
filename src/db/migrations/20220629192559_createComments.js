exports.up = function (knex) {
    return knex.schema.createTable("comments", (table) => {
      table.increments("id").primary();
      table.string("firstName");
      table.string("lastName");
      table.integer("pronouns");
      table.string("comment");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("comments");
  };
  