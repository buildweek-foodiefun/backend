exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string.unique('username').notNullable();
    table.string('password').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
