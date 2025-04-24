// screens/FavoriteRestaurantsScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const favorites = [
  { id: '1', name: 'Lezzetli Restoran', address: 'İstanbul, Taksim' },
  { id: '2', name: 'Nefis Mutfağım', address: 'Ankara, Çankaya' },
];

export default function FavoriteRestaurantsScreen({ navigation }) {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('RestaurantDetails', { restaurant: item })}
    >
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemAddress}>{item.address}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList 
        data={favorites}
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
  itemAddress: { fontSize: 14, color: '#666' },
});
