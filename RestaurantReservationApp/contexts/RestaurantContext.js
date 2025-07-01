import React, { createContext, useContext, useEffect, useState } from 'react';

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/restaurants')
      .then(res => res.json())
      .then(setRestaurants)
      .catch(() => {});
    fetch('http://localhost:3001/reservations')
      .then(res => res.json())
      .then(setReservations)
      .catch(() => {});
  }, []);

  const toggleFavorite = (restaurant) => {
    setFavorites((prev) => {
      const exists = prev.find(r => r.id === restaurant.id);
      if (exists) {
        return prev.filter(r => r.id !== restaurant.id);
      }
      return [...prev, restaurant];
    });
  };

  const addRestaurant = async (restaurant) => {
    const res = await fetch('http://localhost:3001/restaurants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurant)
    });
    const data = await res.json();
    setRestaurants(prev => [...prev, data]);
  };

  const updateRestaurant = async (id, data) => {
    await fetch(`http://localhost:3001/restaurants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const addReservation = async (reservation) => {
    const res = await fetch('http://localhost:3001/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
    });
    const data = await res.json();
    setReservations(prev => [...prev, data]);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, favorites, reservations, toggleFavorite, addRestaurant, updateRestaurant, addReservation }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurant = () => useContext(RestaurantContext);
