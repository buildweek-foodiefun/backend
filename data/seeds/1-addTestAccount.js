const helper = require('../../api/auth/helper');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'admin', password: helper.generateHashedPassword('password')}
      ]);
    });
};
