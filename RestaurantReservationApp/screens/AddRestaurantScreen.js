import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';
import { useAuth } from '../contexts/AuthContext';

export default function AddRestaurantScreen({ navigation }) {
  const { addRestaurant } = useRestaurant();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const handleAdd = () => {
    if (!name || !address) return;
    try {
      addRestaurant({ name, address, description, owner: user?.email });
      Alert.alert('Başarılı', 'Restoran eklendi.', [
        {
          text: 'Tamam',
          onPress: () => {
            if (navigation.canGoBack()) navigation.goBack();
            else navigation.navigate('AdminPanel');
          },
        },
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
      <TextInput
        style={styles.input}
        placeholder="Açıklama"
        value={description}
        onChangeText={setDescription}
      />
      <Button title="Ekle" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
