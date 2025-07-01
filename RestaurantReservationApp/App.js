// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStackScreen from './screens/HomeStackScreen'; // ya da HomeStackScreen'ı App.js içinde de tanımlayabilirsiniz

// Diğer ekran bileşenlerini import edin:
import FavoriteRestaurantsScreen from './screens/FavoriteRestaurantsScreen';
import ReservationsStackScreen from './screens/ReservationsStackScreen';
import ProfileScreen from './screens/ProfileScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import AdminReservationsScreen from './screens/AdminReservationsScreen';
import AdminRestaurantInfoScreen from './screens/AdminRestaurantInfoScreen';

const Tab = createBottomTabNavigator();
const AdminStack = createNativeStackNavigator();

function AdminStackScreen() {
  return (
    <AdminStack.Navigator>
      <AdminStack.Screen
        name="AdminPanel"
        component={AdminPanelScreen}
        options={{ title: 'Y\u00f6netici Paneli' }}
      />
      <AdminStack.Screen
        name="AdminReservations"
        component={AdminReservationsScreen}
        options={{ title: 'Rezervasyonlar' }}
      />
      <AdminStack.Screen
        name="AdminRestaurantInfo"
        component={AdminRestaurantInfoScreen}
        options={{ title: 'Restoran Bilgileri' }}
      />
    </AdminStack.Navigator>
  );
}

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
          component={ReservationsStackScreen}
          options={{ title: 'Rezervasyonlarım' }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: 'Profil' }}
        />
        <Tab.Screen
          name="AdminPanel"
          component={AdminStackScreen}
          options={{ title: 'Y\u00f6netici Paneli' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
