exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          id: 1,
          userId: 1,
          restaurantName: 'Escorpion',
          restaurantType: 'Mexican',
          menuItem: 'Carne Asada Tacos',
          comments:
            'The meat was a little dry and service was slow, but tasted good overall!',
          waitTime: 30,
          photoOfOrder:
            'https://www.eatingonadime.com/wp-content/uploads/2018/05/easy-street-tacos.jpg',
          price: 6.40,
          foodRating: 4,
          dateOfVisit: '2019-05-06'
        }
      ]);
    });
};
