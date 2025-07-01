import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyReservationsScreen from './MyReservationsScreen';
import ReservationDetailsScreen from './ReservationDetailsScreen';

const ReservationsStack = createNativeStackNavigator();

export default function ReservationsStackScreen() {
  return (
    <ReservationsStack.Navigator>
      <ReservationsStack.Screen
        name="MyReservations"
        component={MyReservationsScreen}
        options={{ title: 'Rezervasyonlarım' }}
      />
      <ReservationsStack.Screen
        name="ReservationDetails"
        component={ReservationDetailsScreen}
        options={{ title: 'Rezervasyon Detayları' }}
      />
    </ReservationsStack.Navigator>
  );
}
