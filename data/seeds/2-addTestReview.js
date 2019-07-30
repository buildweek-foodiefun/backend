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
          itemName: 'Honest Burger',
          foodType: 'Burgers',
          comments: 'Ask for the double upgrade!',
          rating: 5,
          photoUrl:
            'https://glutenfreecuppatea.co.uk/wp-content/uploads/2015/05/IMG_0469-1-1024x1024.jpg',
          date: '2019-06-24',
          restaurantName: 'Honest Burgers',
          restaurantInfo: '4A Meard St, Soho, London W1F 0EF, UK'
        }
      ]);
    });
};
