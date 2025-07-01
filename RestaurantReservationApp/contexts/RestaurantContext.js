import React, { createContext, useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';

const API_HOST = Constants.manifest?.debuggerHost?.split(':').shift() || 'localhost';
const API_URL = `http://${API_HOST}:3001`;

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/restaurants`)
      .then(res => res.json())
      .then(setRestaurants)
      .catch(() => {});
    fetch(`${API_URL}/reservations`)
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
    const res = await fetch(`${API_URL}/restaurants`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(restaurant)
    });
    if (!res.ok) throw new Error('Failed to add restaurant');
    const data = await res.json();
    setRestaurants(prev => [...prev, data]);
  };

  const updateRestaurant = async (id, data) => {
    await fetch(`${API_URL}/restaurants/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    setRestaurants(prev => prev.map(r => r.id === id ? { ...r, ...data } : r));
  };

  const addReservation = async (reservation) => {
    const res = await fetch(`${API_URL}/reservations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation)
    });
    if (!res.ok) throw new Error('Failed to add reservation');
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
