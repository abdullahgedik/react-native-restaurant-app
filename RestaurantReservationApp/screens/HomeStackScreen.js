// HomeStackScreen.js (veya App.js içinde fonksiyon olarak tanımlayabilirsiniz)
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantListScreen from './RestaurantListScreen';
import RestaurantDetailsScreen from './RestaurantDetailsScreen';
import ReservationScreen from './ReservationScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="RestaurantList" 
        component={RestaurantListScreen} 
        options={{ title: 'Restoran Listesi' }}
      />
      <HomeStack.Screen 
        name="RestaurantDetails" 
        component={RestaurantDetailsScreen} 
        options={{ title: 'Restoran Detayları' }}
      />
      <HomeStack.Screen 
        name="Reservation" 
        component={ReservationScreen} 
        options={{ title: 'Rezervasyon Oluştur' }}
      />
    </HomeStack.Navigator>
  );
}
