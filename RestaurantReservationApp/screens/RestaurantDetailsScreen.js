import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const { favorites, toggleFavorite, addReservation } = useRestaurant();
  const isFavorite = favorites.some(r => r.id === restaurant.id);

  const handleAddFavorite = () => {
    toggleFavorite(restaurant);
    Alert.alert(
      isFavorite ? 'Favoriden Çıkarıldı' : 'Favorilere Eklendi',
      isFavorite ? 'Restoran favorilerden çıkarıldı.' : 'Restoran favorilere eklendi.'
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{restaurant.name}</Text>
      <Text style={styles.address}>{restaurant.address}</Text>
      <Text style={styles.description}>
        Bu restoran hakkında detaylı bilgileri buraya ekleyebilirsin.
      </Text>
      <Button
        title="Rezervasyon Oluştur"
        onPress={() => navigation.navigate('Reservation', { restaurant })}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title="Yorum Yap"
        onPress={() => navigation.navigate('Review', { restaurant })}
      />
      <View style={styles.buttonSpacing} />
      <Button
        title={isFavorite ? "Favorilerden Çıkar" : "Favorilere Ekle"}
        onPress={handleAddFavorite}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  address: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonSpacing: {
    height: 15,
  },
});
