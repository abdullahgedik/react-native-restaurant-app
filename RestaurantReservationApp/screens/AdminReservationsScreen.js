// screens/AdminReservationsScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const reservations = [
  { id: '1', restaurantName: 'Lezzetli Restoran', customer: 'Ahmet', date: '09/05/2025', time: '19:00', people: 2 },
  { id: '2', restaurantName: 'Nefis Mutfağım', customer: 'Mehmet', date: '10/05/2025', time: '20:00', people: 4 },
];

export default function AdminReservationsScreen() {
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
