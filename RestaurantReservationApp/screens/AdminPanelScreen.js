// screens/AdminPanelScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function AdminPanelScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button title="Rezervasyonları Görüntüle" onPress={() => navigation.navigate('AdminReservations')} />
      <Button title="Restoran Bilgilerini Güncelle" onPress={() => navigation.navigate('AdminRestaurantInfo')} />
      <Button title="Yeni Restoran Ekle" onPress={() => navigation.navigate('AddRestaurant')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
});
