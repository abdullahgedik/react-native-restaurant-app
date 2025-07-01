import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function ReservationScreen({ route, navigation }) {
  // Eğer restoran bilgisi gönderildiyse alıyoruz
  const { restaurant } = route.params;
  const { addReservation } = useRestaurant();
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');
  const [customer, setCustomer] = useState('');

  const handleReservation = async () => {
    await addReservation({
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      date,
      time,
      people,
      customer
    });
    Alert.alert(
      'Rezervasyon Oluşturuldu',
      `Restoran: ${restaurant.name}\nTarih: ${date}\nSaat: ${time}\nKişi Sayısı: ${people}`,
      [{ text: 'Tamam', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {restaurant && (
        <Text style={styles.restaurantName}>Restoran: {restaurant.name}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Adınız"
        value={customer}
        onChangeText={setCustomer}
      />
      <TextInput
        style={styles.input}
        placeholder="Tarih (GG/AA/YYYY)"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Saat (SS:DD)"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Kişi Sayısı"
        keyboardType="numeric"
        value={people}
        onChangeText={setPeople}
      />
      <Button title="Rezervasyonu Onayla" onPress={handleReservation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center'
  },
  restaurantName: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center'
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5
  }
});
