import React, { useState } from "react";
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
const categories = ["All", "Pizza", "Burgers", "Drinks"];

export default function CategoryTabs({ onSelect }: { onSelect: (cat: string) => void }) {
  const [active, setActive] = useState("All");
  const press = (cat: string) => { setActive(cat); onSelect(cat); };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.container}>
      {categories.map((cat) => (
        <TouchableOpacity key={cat} style={[styles.tab, active === cat && styles.activeTab]} onPress={() => press(cat)}>
          <Text style={[styles.label, active === cat && styles.activeLabel]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { marginVertical: 12 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: "#eee", marginRight: 8 },
  activeTab: { backgroundColor: "#1f7aed" },
  label: { fontSize: 14, color: "#333" },
  activeLabel: { color: "#fff", fontWeight: "600" },
});
