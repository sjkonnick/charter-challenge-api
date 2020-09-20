const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/restaurants', (req, res) => {
  const rawData = fs.readFileSync('data/restaurantData.json');
  const restaurants = JSON.parse(rawData.toString());

  let sortedRestaurants;
  if (req.query.nameSort === 'ASC') {
    sortedRestaurants = restaurants.data.sort((a, b) => (a.name > b.name) - (a.name < b.name));
  } else if (req.query.nameSort === 'DESC') {
    sortedRestaurants = restaurants.data.sort((a, b) => (b.name > a.name) - (b.name < a.name));
  } else if (req.query.stateSort === 'ASC') {
    sortedRestaurants = restaurants.data.sort((a, b) => (a.state > b.state) - (a.state < b.state));
  } else if (req.query.stateSort === 'DESC') {
    sortedRestaurants = restaurants.data.sort((a, b) => (b.state > a.state) - (b.state < a.state));
  } else {
    sortedRestaurants = restaurants.data;
  }

  let returnRestaurants = sortedRestaurants;

  if (req.query.search.length) {
    returnRestaurants = returnRestaurants.filter(
      restaurant =>
        restaurant.name.includes(req.query.search) ||
        restaurant.city.includes(req.query.search) ||
        restaurant.genre.toLowerCase().includes(req.query.search),
    );
  }

  if (req.query.state !== 'ALL') {
    returnRestaurants = returnRestaurants.filter(restaurant => restaurant.state === req.query.state);
  }

  if (req.query.genre !== 'ALL') {
    returnRestaurants = returnRestaurants.filter(restaurant => restaurant.genre.includes(req.query.genre));
  }

  if (req.query.attire !== 'ALL') {
    returnRestaurants = returnRestaurants.filter(
      restaurant => restaurant.attire.toLowerCase() === req.query.attire.toLowerCase(),
    );
  }

  const page = req.query.page;

  const results = returnRestaurants.slice(page * 10 - 10, page * 10);

  res.send({ data: results, totalPages: Math.floor(returnRestaurants.length / 10) });
});

app.listen(3001, () => {
  console.log('Server is up on 3001');
});

module.exports = app;
