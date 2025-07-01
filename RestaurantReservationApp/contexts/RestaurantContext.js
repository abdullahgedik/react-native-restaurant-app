import React, { createContext, useContext, useEffect, useState } from 'react';
import Constants from 'expo-constants';

const API_HOST =
  Constants.expoConfig?.hostUri?.split(':').shift() ||
  Constants.manifest?.debuggerHost?.split(':').shift() ||
  'localhost';
const API_URL = `http://${API_HOST}:3001`;

const RestaurantContext = createContext();

export function RestaurantProvider({ children }) {
  const [restaurants, setRestaurants] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/restaurants`)
      .then(res => res.json())
      .then(setRestaurants)
      .catch(() => {});
    fetch(`${API_URL}/reservations`)
      .then(res => res.json())
      .then(setReservations)
      .catch(() => {});
    fetch(`${API_URL}/reviews`)
      .then(res => res.json())
      .then(setReviews)
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
    try {
      const res = await fetch(`${API_URL}/restaurants`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(restaurant)
      });
      if (!res.ok) throw new Error('Failed to add restaurant');
      const data = await res.json();
      setRestaurants(prev => [...prev, data]);
    } catch (err) {
      // Fallback to local state when API is unreachable
      const local = { id: String(Date.now()), ...restaurant };
      setRestaurants(prev => [...prev, local]);
      // Do not rethrow so UI can succeed even when offline
    }
  };

  const updateRestaurant = async (id, data) => {
    try {
      const res = await fetch(`${API_URL}/restaurants/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error('update failed');
    } catch {
      // ignore network errors and update local state
    }
    setRestaurants(prev => prev.map(r => (r.id === id ? { ...r, ...data } : r)));
  };

  const deleteRestaurant = async (id) => {
    try {
      const res = await fetch(`${API_URL}/restaurants/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('delete failed');
    } catch {
      // ignore network errors
    }
    setRestaurants(prev => prev.filter(r => r.id !== id));
    setReservations(prev => prev.filter(res => res.restaurantId !== id));
    setReviews(prev => prev.filter(rv => rv.restaurantId !== id));
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

  const addReview = async (review) => {
    const res = await fetch(`${API_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    if (!res.ok) throw new Error('Failed to add review');
    const data = await res.json();
    setReviews(prev => [...prev, data]);
  };

  return (
    <RestaurantContext.Provider value={{ restaurants, favorites, reservations, reviews, toggleFavorite, addRestaurant, updateRestaurant, deleteRestaurant, addReservation, addReview }}>
      {children}
    </RestaurantContext.Provider>
  );
}

export const useRestaurant = () => useContext(RestaurantContext);
