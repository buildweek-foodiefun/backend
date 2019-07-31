exports.up = function(knex) {
  return knex.schema.createTable('friendships', table => {
    table.increments();
    table
      .integer('requester')
      .unsigned()
      .notNullable();
    table
      .foreign('requester')
      .references('id')
      .inTable('users');
    table
      .integer('receiver')
      .unsigned()
      .notNullable();
    table
      .foreign('receiver')
      .references('id')
      .inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('friendships');
};
