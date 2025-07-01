// screens/AdminReservationsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function AdminReservationsScreen() {
  const { reservations } = useRestaurant();
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.restaurantName} - {item.customer}</Text>
      <Text style={styles.itemDetails}>Tarih: {item.date} | Saat: {item.time} | Kişi: {item.people}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={reservations}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 20 },
  itemContainer: {
    padding: 15,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 15,
  },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemDetails: { fontSize: 14, color: '#666' },
});
