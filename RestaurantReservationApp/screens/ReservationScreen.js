import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function ReservationScreen({ route, navigation }) {
  // Eğer restoran bilgisi gönderildiyse alıyoruz
  const { restaurant } = route.params;
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [people, setPeople] = useState('');

  const handleReservation = () => {
    // Burada gerçek rezervasyon işlemleri API ile entegre edilebilir.
    // Şimdilik basit bir uyarı mesajı ile rezervasyon bilgilerini gösterelim.
    Alert.alert(
      'Rezervasyon Oluşturuldu',
      `Restoran: ${restaurant.name}\nTarih: ${date}\nSaat: ${time}\nKişi Sayısı: ${people}`,
      [{ text: 'Tamam', onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezervasyon Oluştur</Text>
      {restaurant && (
        <Text style={styles.restaurantName}>Restoran: {restaurant.name}</Text>
      )}
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
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center'
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
