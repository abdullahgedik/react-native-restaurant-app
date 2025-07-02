// screens/ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function ReviewScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const { addReview } = useRestaurant();

  const handleSubmitReview = () => {
    try {
      addReview({
        restaurantId: restaurant.id,
        rating,
        comment,
      });
      Alert.alert('Teşekkürler', 'Değerlendirmeniz gönderildi.', [
        { text: 'Tamam', onPress: () => navigation.goBack() },
      ]);
    } catch (e) {
      Alert.alert('Hata', 'Yorum gönderilemedi.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yorum Yap - {restaurant.name}</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map(i => (
          <TouchableOpacity key={i} onPress={() => setRating(i)}>
            <Text style={styles.star}>{i <= rating ? '★' : '☆'}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Yorumunuzu yazın"
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title="Gönder" onPress={handleSubmitReview} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: { borderColor: '#ccc', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 5 },
  starsContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 15 },
  star: { fontSize: 32, marginHorizontal: 5 }
});
