// screens/HistorialScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HistorialScreen() {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const data = await AsyncStorage.getItem('historial');
        if (data) {
          setHistorial(JSON.parse(data));
        }
      } catch (error) {
        console.log(error);
      }
    };

    const focusListener = cargarHistorial;
    focusListener();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.orden}>
      <Text style={styles.fecha}>🕒 {item.fecha}</Text>
      {item.productos.map((prod, index) => (
        <Text key={index}>• {prod.nombre} x{prod.cantidad} - ${prod.subtotal}</Text>
      ))}
      <Text style={styles.total}>Total: ${item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial de Órdenes</Text>
      {historial.length === 0 ? (
        <Text>No hay órdenes aún.</Text>
      ) : (
        <FlatList
          data={historial}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  orden: {
    backgroundColor: '#e6e6e6',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15
  },
  fecha: { fontWeight: 'bold', marginBottom: 5 },
  total: { fontWeight: 'bold', marginTop: 5, textAlign: 'right' }
});
