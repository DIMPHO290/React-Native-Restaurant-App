import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import FoodCard from "../../components/FoodCard";
import { menuItems } from "../data/menu";

function MenuScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Full Menu</Text>
      {menuItems.map((item) => (
        <FoodCard
          key={item.id}
          name={item.name}
          description={item.description}
          price={item.price}
          image={item.image}
        />
      ))}
    </ScrollView>
  );
}

export default MenuScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  header: { fontSize: 22, fontWeight: "700", marginBottom: 16, textAlign: "center" },
});
