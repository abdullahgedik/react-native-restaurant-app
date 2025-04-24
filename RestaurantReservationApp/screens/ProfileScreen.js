// screens/ProfileScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  const user = { name: 'Ahmet Yılmaz', email: 'ahmet@example.com' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil</Text>
      <Text style={styles.label}>İsim:</Text>
      <Text style={styles.value}>{user.name}</Text>
      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{user.email}</Text>
      <Button title="Şifre Güncelle" onPress={() => navigation.navigate('ChangePassword')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 28, marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  value: { fontSize: 18, marginBottom: 10 },
});
