// screens/MyReservationsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function MyReservationsScreen({ navigation }) {
  const { reservations } = useRestaurant();
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
      {reservations.length === 0 ? (
        <Text style={styles.empty}>Aktif rezervasyonunuz yok.</Text>
      ) : (
        <FlatList
          data={reservations}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
        />
      )}
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
  empty: { textAlign: 'center', marginTop: 20, fontSize: 16 },
});
