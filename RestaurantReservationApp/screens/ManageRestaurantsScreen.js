import React from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';
import { useAuth } from '../contexts/AuthContext';

export default function ManageRestaurantsScreen({ navigation }) {
  const { restaurants, deleteRestaurant } = useRestaurant();
  const { user } = useAuth();

  const userRestaurants = restaurants.filter(r => r.owner === user?.email);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <Text style={styles.itemAddress}>{item.address}</Text>
      <View style={styles.actions}>
        <View style={styles.button}>
          <Button
            title="Rezervasyonlar"
            onPress={() => navigation.navigate('AdminReservations', { restaurantId: item.id })}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Düzenle"
            onPress={() => navigation.navigate('AdminRestaurantInfo', { restaurant: item })}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Sil"
            color="red"
            onPress={() => deleteRestaurant(item.id)}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userRestaurants}
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
  button: {
    marginRight: 10,
  },
});
