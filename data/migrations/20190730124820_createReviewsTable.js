exports.up = function(knex) {
  return knex.schema.createTable('reviews', table => {
    table.increments();
    table.integer('userId').unsigned();
    table
      .foreign('userId')
      .references('id')
      .inTable('users');
    table.string('itemName').notNullable();
    table.string('foodType').notNullable();
    table.text('comments');
    table.integer('rating').notNullable();
    table.binary('photo');
    table.string('photoUrl');
    table.date('date').notNullable();
    table.string('restaurantName').notNullable();
    table.text('restaurantInfo');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
