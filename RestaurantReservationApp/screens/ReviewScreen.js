// screens/ReviewScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ReviewScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmitReview = () => {
    Alert.alert('Teşekkürler', 'Değerlendirmeniz gönderildi.', [
      { text: 'Tamam', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Yorum Yap - {restaurant.name}</Text>
      <TextInput
        style={styles.input}
        placeholder="Puan (1-5)"
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />
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
});
