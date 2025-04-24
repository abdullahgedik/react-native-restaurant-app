// screens/AdminRestaurantInfoScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert } from 'react-native';

export default function AdminRestaurantInfoScreen() {
  const [restaurantName, setRestaurantName] = useState('Lezzetli Restoran');
  const [address, setAddress] = useState('İstanbul, Taksim');
  const [description, setDescription] = useState('En iyi lezzetler burada!');

  const handleUpdate = () => {
    Alert.alert('Güncelleme Başarılı', 'Restoran bilgileri güncellendi.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restoran Bilgilerini Güncelle</Text>
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
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  input: {
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1,
    marginBottom: 15, 
    paddingHorizontal: 10, 
    borderRadius: 5,
  },
});
