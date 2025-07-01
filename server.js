const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

let restaurants = [
  { id: '1', name: 'Lezzetli Restoran', address: 'İstanbul, Taksim' },
  { id: '2', name: 'Nefis Mutfağım', address: 'Ankara, Çankaya' },
  { id: '3', name: 'Enfes Yemekler', address: 'İzmir, Alsancak' }
];

let reservations = [];
let reviews = [];

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.post('/restaurants', (req, res) => {
  const { name, address } = req.body;
  const newRestaurant = { id: String(Date.now()), name, address };
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
});

app.put('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const index = restaurants.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).end();
  restaurants[index] = { ...restaurants[index], ...req.body };
  res.json(restaurants[index]);
});

app.delete('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const index = restaurants.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).end();
  restaurants.splice(index, 1);
  reservations = reservations.filter(r => r.restaurantId !== id);
  reviews = reviews.filter(rv => rv.restaurantId !== id);
  res.status(204).end();
});

app.get('/reservations', (req, res) => {
  res.json(reservations);
});

app.post('/reservations', (req, res) => {
  const newReservation = { id: String(Date.now()), ...req.body };
  reservations.push(newReservation);
  res.status(201).json(newReservation);
});

app.get('/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/reviews', (req, res) => {
  const newReview = { id: String(Date.now()), ...req.body };
  reviews.push(newReview);
  res.status(201).json(newReview);
});

app.listen(3001, () => console.log('API running on port 3001')); 
