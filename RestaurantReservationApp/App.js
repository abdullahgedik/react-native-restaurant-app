// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStackScreen from './screens/HomeStackScreen'; // ya da HomeStackScreen'ı App.js içinde de tanımlayabilirsiniz

// Diğer ekran bileşenlerini import edin:
import FavoriteRestaurantsScreen from './screens/FavoriteRestaurantsScreen';
import ReservationsStackScreen from './screens/ReservationsStackScreen';
import ProfileStackScreen from './screens/ProfileStackScreen';
import AdminPanelScreen from './screens/AdminPanelScreen';
import AdminReservationsScreen from './screens/AdminReservationsScreen';
import AdminRestaurantInfoScreen from './screens/AdminRestaurantInfoScreen';
import AddRestaurantScreen from './screens/AddRestaurantScreen';
import { RestaurantProvider } from './contexts/RestaurantContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SplashScreen from './screens/SplashScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const AdminStack = createNativeStackNavigator();
const RootStack = createNativeStackNavigator();

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
      <AdminStack.Screen
        name="AddRestaurant"
        component={AddRestaurantScreen}
        options={{ title: 'Yeni Restoran' }}
      />
    </AdminStack.Navigator>
  );
}

function AppTabs() {
  return (
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
        component={ProfileStackScreen}
        options={{ title: 'Profil' }}
      />
      <Tab.Screen
        name="AdminPanel"
        component={AdminStackScreen}
        options={{ title: 'Y\u00f6netici Paneli' }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <RootStack.Screen name="Splash" component={SplashScreen} />
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <RootStack.Screen name="AppTabs" component={AppTabs} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <RestaurantProvider>
        <AppContent />
      </RestaurantProvider>
    </AuthProvider>
  );
}
