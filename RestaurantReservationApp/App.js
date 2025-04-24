// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './screens/HomeStackScreen'; // ya da HomeStackScreen'ı App.js içinde de tanımlayabilirsiniz

// Diğer ekran bileşenlerini import edin:
import FavoriteRestaurantsScreen from './screens/FavoriteRestaurantsScreen';
import MyReservationsScreen from './screens/MyReservationsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeStackScreen}
          options={{ title: 'Ana Sayfa' }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoriteRestaurantsScreen}
          options={{ title: 'Favoriler' }}
        />
        <Tab.Screen
          name="Reservations"
          component={MyReservationsScreen}
          options={{ title: 'Rezervasyonlarım' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
