// screens/AdminPanelScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function AdminPanelScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restoran Yönetici Paneli</Text>
      <Button title="Rezervasyonları Görüntüle" onPress={() => navigation.navigate('AdminReservations')} />
      <Button title="Restoran Bilgilerini Güncelle" onPress={() => navigation.navigate('AdminRestaurantInfo')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
});
