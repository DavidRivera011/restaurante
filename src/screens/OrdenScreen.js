// screens/OrdenScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function OrdenScreen({ route, navigation }) {
  const { orden, total } = route.params;

  const confirmarOrden = async () => {
    const nuevaOrden = {
      id: Date.now().toString(), // identificador único
      fecha: new Date().toLocaleString(),
      productos: orden,
      total
    };

    try {
      const historialGuardado = await AsyncStorage.getItem('historial');
      let historial = historialGuardado ? JSON.parse(historialGuardado) : [];

      historial.push(nuevaOrden);

      await AsyncStorage.setItem('historial', JSON.stringify(historial));

      Alert.alert('Orden confirmada', `Total: $${total}`, [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Menu'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'No se pudo guardar la orden.');
      console.log(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text>Cantidad: {item.cantidad}</Text>
      <Text>Precio: ${item.precio.toFixed(2)}</Text>
      <Text>Subtotal: ${item.subtotal}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Resumen de tu orden</Text>
      <FlatList
        data={orden}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
      <Text style={styles.total}>Total: ${total}</Text>
      <View style={styles.boton}>
        <Button title="Confirmar Orden" onPress={confirmarOrden} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#f3f3f3',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10
  },
  boton: {
    marginTop: 20
  }
});
