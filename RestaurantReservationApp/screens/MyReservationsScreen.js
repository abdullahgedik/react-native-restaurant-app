// screens/MyReservationsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const reservations = [
  { id: '1', restaurantName: 'Lezzetli Restoran', date: '09/05/2025', time: '19:00', people: 2 },
  { id: '2', restaurantName: 'Nefis Mutfağım', date: '10/05/2025', time: '20:00', people: 4 },
];

export default function MyReservationsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ReservationDetails', { reservation: item })}
    >
      <Text style={styles.itemTitle}>{item.restaurantName}</Text>
      <Text style={styles.itemDetails}>Tarih: {item.date} | Saat: {item.time} | Kişi: {item.people}</Text>
    </TouchableOpacity>
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
