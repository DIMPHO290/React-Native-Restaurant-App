import React, { useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import Hero from "../../components/Hero";
import CategoryTabs from "../../components/CategoryTabs";
import FoodCard from "../../components/FoodCard";
import { menuItems } from "../data/menu";

function HomeScreen() {
  const [category, setCategory] = useState("All");

  const filteredItems =
    category === "All" ? menuItems : menuItems.filter((item) => item.category === category);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Hero />
      <CategoryTabs onSelect={setCategory} />
      <Text style={styles.sectionTitle}>{category} Dishes</Text>
      {filteredItems.map((item) => (
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

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 16 },
  sectionTitle: { fontSize: 20, fontWeight: "700", marginVertical: 12 },
});
