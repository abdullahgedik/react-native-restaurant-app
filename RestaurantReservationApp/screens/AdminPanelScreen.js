// screens/AdminPanelScreen.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

export default function AdminPanelScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button title="Restoranları Yönet" onPress={() => navigation.navigate('ManageRestaurants')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Yeni Restoran Ekle" onPress={() => navigation.navigate('AddRestaurant')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  buttonContainer: { marginBottom: 15 },
});
