import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRestaurant } from '../contexts/RestaurantContext';

export default function ReservationScreen({ route, navigation }) {
  // Eğer restoran bilgisi gönderildiyse alıyoruz
  const { restaurant } = route.params;
  const { addReservation } = useRestaurant();
  const [date, setDate] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTime, setShowTime] = useState(false);
  const [people, setPeople] = useState('');
  const [customer, setCustomer] = useState('');

  const handleReservation = () => {
    if (!customer || !people) {
      Alert.alert('Eksik Bilgi', 'Lütfen tüm alanları doldurun.');
      return;
    }
    try {
      addReservation({
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        date: date.toISOString(),
        time: time.toISOString(),
        people,
        customer,
      });
      Alert.alert(
        'Rezervasyon Oluşturuldu',
        `Restoran: ${restaurant.name}\nTarih: ${date.toLocaleDateString()}\nSaat: ${time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\nKişi Sayısı: ${people}`,
        [{ text: 'Tamam', onPress: () => navigation.goBack() }]
      );
    } catch (e) {
      Alert.alert('Hata', 'Rezervasyon oluşturulamadı.');
    }
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
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDate(true)}
      >
        <Text>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowTime(true)}
      >
        <Text>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(e, d) => {
            setShowDate(false);
            if (d) setDate(d);
          }}
        />
      )}
      {showTime && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(e, t) => {
            setShowTime(false);
            if (t) setTime(t);
          }}
        />
      )}
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
