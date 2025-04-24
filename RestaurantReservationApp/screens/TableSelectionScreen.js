// screens/TableSelectionScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Button, StyleSheet } from 'react-native';

const tables = [
  { id: '1', name: 'Masa 1' },
  { id: '2', name: 'Masa 2' },
  { id: '3', name: 'Masa 3' },
  { id: '4', name: 'Masa 4' },
];

export default function TableSelectionScreen({ route, navigation }) {
  const { restaurant } = route.params;
  const [selectedTable, setSelectedTable] = useState(null);

  const handleSelectTable = () => {
    if (!selectedTable) return;
    // Seçim sonrası işlemleri ekleyebilirsiniz.
    navigation.goBack();
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.tableItem, selectedTable === item.id && styles.selectedTable]}
      onPress={() => setSelectedTable(item.id)}
    >
      <Text style={styles.tableText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{restaurant.name} - Masa Seçimi</Text>
      <FlatList 
        data={tables}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
      <Button title="Masa Seçimini Onayla" onPress={handleSelectTable} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  list: { marginBottom: 20 },
  tableItem: { padding: 15, backgroundColor: '#f2f2f2', borderRadius: 8, marginBottom: 15, alignItems: 'center' },
  selectedTable: { backgroundColor: '#d0e8ff' },
  tableText: { fontSize: 18 },
});
