import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function AddRestaurantScreen({ navigation }) {
  const { addRestaurant } = useRestaurant();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = async () => {
    if (!name || !address) return;
    try {
      await addRestaurant({ name, address });
      Alert.alert('Başarılı', 'Restoran eklendi.', [
        { text: 'Tamam', onPress: () => navigation.goBack() }
      ]);
    } catch (e) {
      Alert.alert('Hata', 'Restoran eklenemedi.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Restoran Adı"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Adres"
        value={address}
        onChangeText={setAddress}
      />
      <Button title="Ekle" onPress={handleAdd} />
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
