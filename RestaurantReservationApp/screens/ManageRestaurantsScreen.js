import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function ManageRestaurantsScreen({ navigation }) {
  const { restaurants, deleteRestaurant } = useRestaurant();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemAddress}>{item.address}</Text>
      <View style={styles.actions}>
        <Button
          title="Düzenle"
          onPress={() => navigation.navigate('AdminRestaurantInfo', { restaurant: item })}
        />
        <Button
          title="Sil"
          color="red"
          onPress={() => deleteRestaurant(item.id)}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={r => r.id}
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
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
