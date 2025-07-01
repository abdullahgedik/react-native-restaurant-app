// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.account}>Hesap: {user.email}</Text>
      <View style={styles.buttonSpacing} />
      <Button title="Şifre Güncelle" onPress={() => navigation.navigate('ChangePassword')} />
      <View style={styles.buttonSpacing} />
      <Button title="Çıkış Yap" onPress={logout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  account: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  buttonSpacing: { height: 15 },
});
