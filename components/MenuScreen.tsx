
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import FoodCard from "../components/FoodCard";
import { menuItems } from "@/src/data/menu";

function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Our Menu</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FoodCard
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

export default MenuScreen; // <-- critical for your import to work

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16, paddingTop: 24 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, textAlign: "center" },
  list: { paddingBottom: 32 },
});
