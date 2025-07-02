import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function RestaurantDetailsScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const { favorites, toggleFavorite, reviews } = useRestaurant();
  const isFavorite = favorites.some(r => r.id === restaurant.id);
  const restaurantReviews = reviews.filter(r => r.restaurantId === restaurant.id);
  const rating = restaurantReviews.length
    ? (
        restaurantReviews.reduce((s, r) => s + Number(r.rating || 0), 0) /
        restaurantReviews.length
      ).toFixed(1)
    : '0';

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
      {restaurant.description ? (
        <Text style={styles.description}>{restaurant.description}</Text>
      ) : null}
      <Text style={styles.rating}>Puan: {rating} ({restaurantReviews.length})</Text>
      <View style={styles.actions}>
        <Button
          title="Rezervasyon Oluştur"
          onPress={() => navigation.navigate('Reservation', { restaurant })}
        />
        <Button
          title="Yorum Yap"
          onPress={() => navigation.navigate('Review', { restaurant })}
        />
        <Button
          title={isFavorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
          onPress={handleAddFavorite}
        />
      </View>
      {restaurantReviews.map(r => (
        <View key={r.id} style={styles.reviewContainer}>
          <Text style={styles.reviewText}>{r.comment}</Text>
        </View>
      ))}
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
  rating: { fontSize: 16, marginBottom: 20 },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'stretch',
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  reviewContainer: {
    alignSelf: 'stretch',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
});
