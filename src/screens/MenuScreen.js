import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  DrawerLayoutAndroid,
} from "react-native";

export default function MenuScreen({ navigation }) {
  const drawer = useRef(null);

  const handleLogout = () => {
    navigation.replace("Login");
  };

  const navigationView = () => (
    <View style={styles.drawerContainer}>
      <Text style={styles.drawerTitle}>Menú</Text>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate("Seleccionar");
          drawer.current.closeDrawer();
        }}
      >
        <Text style={styles.drawerText}>Seleccionar Comida</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          navigation.navigate("Historial");
          drawer.current.closeDrawer();
        }}
      >
        <Text style={styles.drawerText}>Historial de Órdenes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          handleLogout();
          drawer.current.closeDrawer();
        }}
      >
        <Text style={[styles.drawerText, { color: "red" }]}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={navigationView}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.usuario}>👤 Bienvenido, admin</Text>

        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/256/7845/7845744.png",
          }}
          style={styles.imagen}
          resizeMode="contain"
        />

        <Text style={styles.title}>Menú Principal</Text>

        <View style={styles.botonesGrid}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Seleccionar")}
          >
            <Image
              source={{
                uri: "https://static.vecteezy.com/system/resources/previews/015/887/654/non_2x/food-dishes-icon-outline-meal-dish-vector.jpg",
              }}
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Seleccionar Comida</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Historial")}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.freepik.com/512/32/32223.png",
              }}
              style={styles.cardIcon}
            />
            <Text style={styles.cardText}>Historial de Ordenes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, styles.cardLogout]}
            onPress={handleLogout}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/992/992680.png",
              }}
              style={styles.cardIcon}
            />
            <Text style={[styles.cardText, { color: "red" }]}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 30,
    alignItems: "center",
  },
  usuario: {
    alignSelf: "flex-end",
    marginBottom: 50,
    fontWeight: "bold",
    color: "#333",
  },
  imagen: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 50,
    textAlign: "center",
  },
  botonesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "47%",
    aspectRatio: 1,
    backgroundColor: "#fff",
    marginBottom: 20,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  cardText: {
    color: "#000",
    fontWeight: "bold",
    textAlign: "center",
  },
  cardLogout: {
    borderWidth: 1,
    borderColor: "red",
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  drawerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 30,
  },
  drawerItem: {
    marginBottom: 20,
  },
  drawerText: {
    fontSize: 16,
    color: "#333",
  },
});
