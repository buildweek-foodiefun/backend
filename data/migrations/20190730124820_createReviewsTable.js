exports.up = function(knex) {
  return knex.schema.createTable('reviews', table => {
    table.increments();
    table.integer('userId').unsigned().notNullable();
    table
      .foreign('userId')
      .references('id')
      .inTable('users');
    table.string('menuItem').notNullable();
    table.string('restaurantType').notNullable();
    table.text('comments');
    table.integer('foodRating').notNullable();
    table.integer('waitTime').notNullable();
    table.float('price').notNullable();
    table.string('photoOfOrder');
    table.date('dateOfVisit').notNullable();
    table.string('restaurantName').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
