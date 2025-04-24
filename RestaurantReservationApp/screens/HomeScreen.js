import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ana Sayfa</Text>
      
      <Button
        title="Restoran Listesi"
        onPress={() => navigation.navigate('RestaurantList')}
      />
      <View style={styles.buttonSpacing} />
      
      <Button
        title="Rezervasyonlarım"
        onPress={() => navigation.navigate('MyReservations')}
      />
      <View style={styles.buttonSpacing} />
      
      <Button
        title="Profil"
        onPress={() => navigation.navigate('Profile')}
      />
      <View style={styles.buttonSpacing} />
      
      <Button
        title="Favori Restoranlar"
        onPress={() => navigation.navigate('Favorites')}
      />
      <View style={styles.buttonSpacing} />
      
      <Button
        title="Yönetici Paneli"
        onPress={() => navigation.navigate('AdminPanel')}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonSpacing: {
    height: 15,
  },
});
