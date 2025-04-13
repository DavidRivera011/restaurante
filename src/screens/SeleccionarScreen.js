import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TextInput, Image, Alert, Dimensions } from 'react-native';

const productosData = [
  { id: '1', nombre: 'Taco de carne', precio: 2.5, imagen: 'https://familiakitchen.com/wp-content/uploads/2021/01/iStock-960337396-3beef-barbacoa-tacos-e1695391119564.jpg', categoria: 'comida' },
  { id: '2', nombre: 'Burrito', precio: 3.0, imagen: 'https://assets.unileversolutions.com/recipes-v2/248654.jpg', categoria: 'comida' },
  { id: '3', nombre: 'Enchilada', precio: 2.8, imagen: 'https://www.gourmet.cl/wp-content/uploads/2021/08/foto-istock-enchilada-tama%C3%B1o-web.jpg', categoria: 'comida' },
  { id: '4', nombre: 'Pupusas de Frijol con Queso', precio: 2.0, imagen: 'https://www.cocinavital.mx/wp-content/uploads/2024/01/receta-de-pupusas-salvadorenas.jpg', categoria: 'comida' },
  { id: '5', nombre: 'Quesadilla', precio: 2.2, imagen: 'https://www.t-fal.com.mx/medias/?context=bWFzdGVyfHJvb3R8MTE4NTF8aW1hZ2UvanBlZ3xhRFZtTDJnd1lpOHhNamMyTmpVNE56ZzNPVFExTkM1cWNHY3w5YTcxMzIxMTkyOTVhMjc4NjVhNzc5YWZlYTFmZWEzMjJjMjM4OTkwNjk0MzRkMDJlNTkwYjhiNDI1YWJmODdl', categoria: 'comida' },
  { id: '6', nombre: 'Nachos', precio: 3.5, imagen: 'https://simplehomeedit.com/wp-content/uploads/2024/04/Loaded-Veg-Nachos-3.webp', categoria: 'comida' },
  { id: '7', nombre: 'Tamales', precio: 1.8, imagen: 'https://www.cocinadelirante.com/800x600/filters:format(webp):quality(75)/sites/default/files/images/2024/01/receta-de-tamales-de-leche-condensada-deliciosos-y-faciles.jpg', categoria: 'comida' },
  { id: '8', nombre: 'Sopa Azteca', precio: 2.7, imagen: 'https://peopleenespanol.com/thmb/zz0Zy7ZsEEs6_4iioxOUpW__h8o=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/sopa-azteca-de-tortilla-2000-5589000dfa924e3fa1295e58b40e043e.jpg', categoria: 'comida' },
  { id: '9', nombre: 'Fajitas', precio: 4.0, imagen: 'https://imagenes.elpais.com/resizer/v2/OJFD47FY65EW3LUMRNM3QJSH7U.jpg?auth=65ff14d64d82b13083c519dc68e39a485d73e98043bd109a480f57805ecd6300&width=1960&height=1470&smart=true', categoria: 'comida' },
  { id: '10', nombre: 'Taco vegetariano', precio: 2.3, imagen: 'https://recetasveganas.net/wp-content/uploads/2020/07/recetas-tacos-sin-carne-vegetariano-alubias-aguacate-tomate-olivas2.jpg', categoria: 'comida' },
  { id: '11', nombre: 'Agua horchata', precio: 1.2, imagen: 'https://inmamamaggieskitchen.com/wp-content/uploads/2023/01/Horchata-served-with-tons-of-ice.jpg', categoria: 'bebida' },
  { id: '12', nombre: 'Agua jamaica', precio: 1.2, imagen: 'https://www.clarin.com/2020/07/21/7Pj44-Cyq_600x600__1.jpg', categoria: 'bebida' },
  { id: '13', nombre: 'Agua tamarindo', precio: 1.2, imagen: 'https://inmamamaggieskitchen.com/wp-content/uploads/2021/06/Agua-de-Tamarindo-HERO.jpg', categoria: 'bebida' },
  { id: '14', nombre: 'Refresco cola', precio: 1.5, imagen: 'https://comedera.com/wp-content/uploads/sites/9/2021/01/fresh-cola-drink-with-ice.jpg', categoria: 'bebida' },
  { id: '15', nombre: 'Cerveza', precio: 2.0, imagen: 'https://iocagroup.com/wp-content/uploads/2023/05/cerveza.webp', categoria: 'bebida' },
];

export default function SeleccionarScreen({ navigation }) {
  const [cantidades, setCantidades] = useState({});

  const handleIncrementar = (id) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: (prevCantidades[id] || 0) + 1,
    }));
  };

  const handleDecrementar = (id) => {
    setCantidades((prevCantidades) => ({
      ...prevCantidades,
      [id]: Math.max((prevCantidades[id] || 0) - 1, 0),
    }));
  };

  const agregarOrden = () => {
    const productosSeleccionados = productosData.filter(p => cantidades[p.id] > 0);
    if (productosSeleccionados.length === 0) {
      Alert.alert('Error', 'Selecciona al menos un producto.');
      return;
    }

    const orden = productosSeleccionados.map(p => ({
      nombre: p.nombre,
      cantidad: cantidades[p.id],
      precio: p.precio,
      subtotal: (cantidades[p.id] * p.precio).toFixed(2),
    }));

    const total = orden.reduce((sum, item) => sum + (item.cantidad * item.precio), 0).toFixed(2);

    navigation.navigate('Orden', {
      orden,
      total
    });
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagen }} style={styles.imagen} />
      <Text style={styles.nombre}>{item.nombre}</Text>
      <Text style={styles.precio}>${item.precio.toFixed(2)}</Text>
      <View style={styles.cantidadContenedor}>
        <Button title="-" onPress={() => handleDecrementar(item.id)} />
        <Text style={styles.cantidadTexto}>{cantidades[item.id] || 0}</Text>
        <Button title="+" onPress={() => handleIncrementar(item.id)} />
      </View>
    </View>
  );

  // Filtrar productos por categoría
  const comidas = productosData.filter(p => p.categoria === 'comida');
  const bebidas = productosData.filter(p => p.categoria === 'bebida');

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Selecciona tus productos</Text>

      {/* Sección de Comidas */}
      <Text style={styles.subtitulo}>Comidas</Text>
      <FlatList
        data={comidas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.fila}
      />

      {/* Sección de Bebidas */}
      <Text style={styles.subtitulo}>Bebidas</Text>
      <FlatList
        data={bebidas}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.fila}
      />

      <View style={styles.boton}>
        <Button title="Agregar a la orden" onPress={agregarOrden} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: '#fff' },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#555'
  },
  fila: {
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    width: Dimensions.get('window').width / 2 - 20,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    elevation: 3,
  },
  imagen: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderRadius: 10
  },
  nombre: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  precio: {
    color: '#555',
    marginBottom: 5
  },
  cantidadContenedor: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cantidadTexto: {
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  boton: {
    marginTop: 10,
    backgroundColor: '#fff',
  }
});
