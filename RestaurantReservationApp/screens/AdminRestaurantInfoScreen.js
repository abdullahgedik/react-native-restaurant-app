// screens/AdminRestaurantInfoScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function AdminRestaurantInfoScreen() {
  const { restaurants, updateRestaurant } = useRestaurant();
  const restaurant = restaurants[0] || { name: '', address: '', description: '' };
  const [restaurantName, setRestaurantName] = useState(restaurant.name);
  const [address, setAddress] = useState(restaurant.address);
  const [description, setDescription] = useState(restaurant.description || '');

  const handleUpdate = async () => {
    if (!restaurant.id) return;
    await updateRestaurant(restaurant.id, {
      name: restaurantName,
      address,
      description
    });
    Alert.alert('Güncelleme Başarılı', 'Restoran bilgileri güncellendi.');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Restoran Adı"
        value={restaurantName}
        onChangeText={setRestaurantName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adres"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Güncelle" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15, 
    paddingHorizontal: 10, 
    borderRadius: 5,
  },
});
