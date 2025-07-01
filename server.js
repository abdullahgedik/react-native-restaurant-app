const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'data.json');

function loadData() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return { restaurants: [], reservations: [], reviews: [] };
  }
}

function saveData() {
  fs.writeFileSync(
    DATA_FILE,
    JSON.stringify({ restaurants, reservations, reviews }, null, 2)
  );
}

let { restaurants, reservations, reviews } = loadData();

app.get('/restaurants', (req, res) => {
  res.json(restaurants);
});

app.post('/restaurants', (req, res) => {
  const { name, address, owner } = req.body;
  const newRestaurant = { id: String(Date.now()), name, address, owner };
  restaurants.push(newRestaurant);
  saveData();
  res.status(201).json(newRestaurant);
});

app.put('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const index = restaurants.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).end();
  restaurants[index] = { ...restaurants[index], ...req.body };
  saveData();
  res.json(restaurants[index]);
});

app.delete('/restaurants/:id', (req, res) => {
  const { id } = req.params;
  const index = restaurants.findIndex(r => r.id === id);
  if (index === -1) return res.status(404).end();
  restaurants.splice(index, 1);
  reservations = reservations.filter(r => r.restaurantId !== id);
  reviews = reviews.filter(rv => rv.restaurantId !== id);
  saveData();
  res.status(204).end();
});

app.get('/reservations', (req, res) => {
  res.json(reservations);
});

app.post('/reservations', (req, res) => {
  const newReservation = { id: String(Date.now()), ...req.body };
  reservations.push(newReservation);
  saveData();
  res.status(201).json(newReservation);
});

app.get('/reviews', (req, res) => {
  res.json(reviews);
});

app.post('/reviews', (req, res) => {
  const newReview = { id: String(Date.now()), ...req.body };
  reviews.push(newReview);
  saveData();
  res.status(201).json(newReview);
});

app.listen(3001, () => console.log('API running on port 3001')); 
