// screens/ReservationDetailsScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';

export default function ReservationDetailsScreen({ route, navigation }) {
  const { reservation } = route.params;
  
  const handleCancel = () => {
    Alert.alert('Rezervasyon İptal Edildi', 'Rezervasyonunuz iptal edilmiştir.', [
      { text: 'Tamam', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{reservation.restaurantName}</Text>
      <Text style={styles.details}>Tarih: {reservation.date}</Text>
      <Text style={styles.details}>Saat: {reservation.time}</Text>
      <Text style={styles.details}>Kişi Sayısı: {reservation.people}</Text>
      <Button title="Rezervasyonu İptal Et" onPress={handleCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  details: { fontSize: 18, marginBottom: 10, textAlign: 'center' },
});
